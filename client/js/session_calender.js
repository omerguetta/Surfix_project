// session_calendar.js

document.addEventListener('DOMContentLoaded', function() {
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
