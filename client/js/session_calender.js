document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const currentDate = new Date();
    let selectedDate = null;

    function createCalendar(year, month) {
        calendarElement.innerHTML = '';

        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('calendar-header');

        const monthSelect = document.createElement('select');
        const yearSelect = document.createElement('select');

        for (let i = 0; i < 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = new Date(0, i).toLocaleString('default', { month: 'long' });
            if (i === month) option.selected = true;
            monthSelect.appendChild(option);
        }

        for (let i = 2020; i <= new Date().getFullYear(); i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            if (i === year) option.selected = true;
            yearSelect.appendChild(option);
        }

        calendarHeader.appendChild(monthSelect);
        calendarHeader.appendChild(yearSelect);
        calendarElement.appendChild(calendarHeader);

        const calendar = document.createElement('div');
        calendar.classList.add('calendar');

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const day = document.createElement('div');
            calendar.appendChild(day);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            day.addEventListener('click', () => selectDate(year, month, i, day));
            calendar.appendChild(day);
        }

        calendarElement.appendChild(calendar);

        monthSelect.addEventListener('change', () => createCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value)));
        yearSelect.addEventListener('change', () => createCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value)));
    }

    function selectDate(year, month, day, element) {
        if (selectedDate) {
            selectedDate.classList.remove('selected');
        }
        selectedDate = element;
        selectedDate.classList.add('selected');
        console.log(`Selected date: ${year}-${month + 1}-${day}`);
    }

    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const sessionCardContainer = document.querySelector('.session-card-container');
    const currentDate = new Date();
    let selectedDate = null;

    let sessions = [];

    function loadSessions() {
        fetch('../data/sessions.json')
            .then(response => response.json())
            .then(data => {
                sessions = data;
                displayAllSessions();
            })
            .catch(error => console.error('Error loading sessions:', error));
    }

    function createCalendar(year, month) {
        calendarElement.innerHTML = '';

        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('calendar-header');

        const monthSelect = document.createElement('select');
        const yearSelect = document.createElement('select');

        for (let i = 0; i < 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = new Date(0, i).toLocaleString('default', { month: 'long' });
            if (i === month) option.selected = true;
            monthSelect.appendChild(option);
        }

        for (let i = 2020; i <= new Date().getFullYear(); i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            if (i === year) option.selected = true;
            yearSelect.appendChild(option);
        }

        calendarHeader.appendChild(monthSelect);
        calendarHeader.appendChild(yearSelect);
        calendarElement.appendChild(calendarHeader);

        const calendar = document.createElement('div');
        calendar.classList.add('calendar');

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const day = document.createElement('div');
            calendar.appendChild(day);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            day.addEventListener('click', () => selectDate(year, month, i, day));
            calendar.appendChild(day);
        }

        calendarElement.appendChild(calendar);

        monthSelect.addEventListener('change', () => createCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value)));
        yearSelect.addEventListener('change', () => createCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value)));
    }

    function selectDate(year, month, day, element) {
        if (selectedDate) {
            selectedDate.classList.remove('selected');
        }
        selectedDate = element;
        selectedDate.classList.add('selected');
        const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        displaySessions(selectedDateStr);
    }

    function displaySessions(date) {
        sessionCardContainer.innerHTML = '';

        const filteredSessions = sessions.filter(session => session.date === date);

        filteredSessions.forEach(session => {
            const sessionCard = document.createElement('div');
            sessionCard.classList.add('session-card');

            sessionCard.innerHTML = `
                <div class="current-date">
                    <span class="current-date-value">${session.date}</span>
                </div>
                <div class="session-header">
                    <div class="session-title-col">
                        <span class="icon"><img src="../images/surfer-icon.png" alt=""></span>
                        <span class="session-title">${session.name}</span>
                    </div>
                    <div class="session-time-col">
                        <span class="session-time">${session.duration}</span>
                    </div>
                </div>
                <div class="session-details">
                    <div class="star-col">
                        <span class="star">★</span>
                        <span class="detail-value">${session.stars}</span>
                    </div>
                    <div class="side-col">
                        <div class="footer">
                            <span class="wave-icon"><img src="../images/wave-svgrepo-com.svg" alt=""> Left</span>
                            <span class="wave-value">${session.wave_left}</span>
                        </div>
                    </div>
                </div>
                <div class="session-details2">
                    <div class="location-col">
                        <span class="location-icon"><img src="../images/location-icon.png" alt=""></span>
                        <span class="detail-value">${session.location}</span>
                    </div>
                    <div class="footer">
                        <span class="wave-icon"><img src="../images/wave-svgrepo-com.svg" alt=""> Right</span>
                        <span class="wave-value">${session.wave_right}</span>
                    </div>
                </div>
            `;

            sessionCard.addEventListener('click', () => {
                localStorage.setItem('selectedSession', JSON.stringify(session));
                window.location.href = 'session_page.html';
            });
            sessionCardContainer.appendChild(sessionCard);
        });
    }

    function displayAllSessions() {
        sessionCardContainer.innerHTML = '';

        sessions.forEach(session => {
            const sessionCard = document.createElement('div');
            sessionCard.classList.add('session-card');

            sessionCard.innerHTML = `
                <div class="current-date">
                    <span class="current-date-value">${session.date}</span>
                </div>
                <div class="session-header">
                    <div class="session-title-col">
                        <span class="icon"><img src="../images/surfer-icon.png" alt=""></span>
                        <span class="session-title">${session.name}</span>
                    </div>
                    <div class="session-time-col">
                        <span class="session-time">${session.duration}</span>
                    </div>
                </div>
                <div class="session-details">
                    <div class="star-col">
                        <span class="star">★</span>
                        <span class="detail-value">${session.stars}</span>
                    </div>
                    <div class="side-col">
                        <div class="footer">
                            <span class="wave-icon"><img src="../images/wave-svgrepo-com.svg" alt=""> Left</span>
                            <span class="wave-value">${session.wave_left}</span>
                        </div>
                    </div>
                </div>
                <div class="session-details2">
                    <div class="location-col">
                        <span class="location-icon"><img src="../images/location-icon.png" alt=""></span>
                        <span class="detail-value">${session.location}</span>
                    </div>
                    <div class="footer">
                        <span class="wave-icon"><img src="../images/wave-svgrepo-com.svg" alt=""> Right</span>
                        <span class="wave-value">${session.wave_right}</span>
                    </div>
                </div>
            `;

            sessionCardContainer.appendChild(sessionCard);
        });
    }

    createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    loadSessions();
});
