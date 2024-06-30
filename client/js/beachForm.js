async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const beachData = Object.fromEntries(formData);
    const beachId = form.getAttribute('data-beach-id');

    try {
        const url = beachId ? `http://localhost:3000/api/beach/${beachId}` : 'http://localhost:3000/api/beach';
        const method = beachId ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beachData)
        });
        if (response.ok) {
            window.location.href = document.referrer;
        } else {
            console.error(`Failed to ${beachId ? 'update' : 'create'} beach:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error(`Error ${beachId ? 'updating' : 'creating'} beach:`, error);
    }
}

async function handleDeleteBeach(beachId) {
    try {
        console.log(beachId);
        const response = await fetch(`http://localhost:3000/api/beach/${beachId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.href = 'for_you.html';
        } else {
            console.error('Failed to delete beach:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting beach:', error);
    }
}

async function displayBeach(beach) {
    const form = document.querySelector('.beach-form');
    if (form) {
        form.name.value = beach.name || '';
        form.distance.value = beach.distance || '';
        form.onshore_wind.value = beach.onshore_wind || '';
        form.rising_tide.value = beach.rising_tide || '';
        form.air_temperature.value = beach.air_temperature || '';
        form.water_temperature.value = beach.water_temperature || '';
        form.wave_direction.value = beach.wave_direction || '';
        form.wave_height.value = beach.wave_height || '';
        form.visibility.value = beach.visibility || '';

        if (beach.id) {
            form.setAttribute('data-beach-id', beach.id);
            document.querySelector('.delete_btn').addEventListener('click', (event) => {
                event.preventDefault();
                handleDeleteBeach(beach.id);
            });
        } else {
            form.removeAttribute('data-beach-id');
        }
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found');
    }
}

async function getBeachFromServer(beachId) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach/${beachId}`);
        const beachData = await response.json();
        await displayBeach(beachData);
    } catch (error) {
        console.error(`Error fetching beach with ID ${beachId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId');
    if (beachId) {
        document.querySelector('.delete_btn').style.visibility = 'visible';
        document.querySelector('.submit_btn').textContent = 'Update';
        await getBeachFromServer(beachId);
    } else {
        document.querySelector('.delete_btn').style.visibility = 'hidden';
        document.querySelector('.submit_btn').textContent = 'Create';
        await displayBeach({});
    }
    document.querySelector(".BeachPage").addEventListener('click', () => {
        window.location.href = document.referrer;
    });
});