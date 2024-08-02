import beachService from "./services/beachService.js";

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const beachData = Object.fromEntries(formData);

    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId');
    
    if (beachId) {
        await beachService.update(beachData, beachId);
    } else {
        await beachService.add(beachData);
    }
    window.location.href = './index.html';
}

async function displayBeach(beach = {}) {
    const form = document.querySelector('.beach-form');
    if (form) {
        form.name.value = beach.name || '';
        form.distance.value = beach.distance || '';
        form.onshoreWind.value = beach.onshoreWind || '';
        form.risingTide.value = beach.risingTide || '';
        form.airTemperature.value = beach.airTemperature || '';
        form.waterTemperature.value = beach.waterTemperature || '';
        form.waveDirection.value = beach.waveDirection || '';
        form.waveHeight.value = beach.waveHeight || '';
        form.visibility.value = beach.visibility || '';

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