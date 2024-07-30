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
        form.name.value = beach.name;
        form.distance.value = beach.distance;
        form.onshore_wind.value = beach.onshoreWind;
        form.rising_tide.value = beach.risingTide;
        form.air_temperature.value = beach.airTemperature;
        form.water_temperature.value = beach.waterTemperature;
        form.wave_direction.value = beach.waveDirection;
        form.wave_height.value = beach.waveHeight;
        form.visibility.value = beach.visibility;

        if (beach.id) {
            form.setAttribute('data-beach-id', beach.id);
            document.querySelector('.delete-btn').addEventListener('click', async (event) => {
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

async function getBeach(beachId) {
    const beachData = await beachService.getById(beachId);
    await displayBeach(beachData);
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId');
    if (beachId) {
        document.querySelector('.delete-btn').style.visibility = 'visible';
        document.querySelector('.submit-btn').textContent = 'Update';
        await getBeach(beachId);
    } else {
        document.querySelector('.delete-btn').style.visibility = 'hidden';
        document.querySelector('.submit-btn').textContent = 'Create';
        await displayBeach();
    }
    document.querySelector(".to-beach-page").addEventListener('click', () => {
        window.location.href = document.referrer;
    });
});