import beachService from "./services/beachService.js";

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const beachData = Object.fromEntries(formData);
    const beachId = form.getAttribute('data-beach-id');

    if(beachId) {
        await beachService.update(beachData, beachId);
    } else {
        await beachService.add(beachData);
    }


}

async function displayBeach(beach={}) {
    const form = document.querySelector('.beach-form');
    if (form) {
        form.name.value = beach.name || '';
        form.distance.value = (beach.distance || '') + ' km';
        form.onshore_wind.value = (beach.onshore_wind || '') + ' km/h';
        form.rising_tide.value = (beach.rising_tide || '') + ' m';
        form.air_temperature.value = (beach.air_temperature || '') + ' °C';
        form.water_temperature.value = (beach.water_temperature || '') + ' °C';
        form.wave_direction.value = (beach.wave_direction || '') + ' °';
        form.wave_height.value = (beach.wave_height || '') + ' m';
        form.visibility.value = (beach.visibility || '') + ' km';

        if (beach.id) {
            form.setAttribute('data-beach-id', beach.id);
            document.querySelector('.delete_btn').addEventListener('click', async (event) => {
                event.preventDefault();
                await beachService.remove(beach.id);
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
    const beachData = await beachService.getById(beachId);
    await displayBeach(beachData);
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
        await displayBeach();
    }
    document.querySelector(".BeachPage").addEventListener('click', () => {
        window.location.href = document.referrer;
    });
});