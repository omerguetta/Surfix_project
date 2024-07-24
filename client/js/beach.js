import beachService from "./services/beachService.js";

async function displayBeach(beach) {
    const beachName = document.getElementById("beachName");
    beachName.textContent = beach.name;

    const onshoreWind = document.querySelector(".wind h6");
    onshoreWind.textContent = `${beach.onshore_wind} km/h`;

    const risingTide = document.querySelector(".tide h6");
    risingTide.textContent = `${beach.rising_tide} m`;

    const airTemperature = document.querySelector(".airTemperature");
    airTemperature.textContent = `${beach.air_temperature} °C`;

    const waterTemperature = document.querySelector(".waterTemperature");
    waterTemperature.textContent = `${beach.water_temperature} °C`;

    const waveHeight = document.querySelector(".waveHeight");
    waveHeight.textContent = `${beach.wave_height} m`;

    const waveDirection = document.querySelector(".waveDirection");
    waveDirection.textContent = `${beach.wave_direction}`;
}

async function getBeachFromServer(beachId) {
    try {
        const beachData = await beachService.getById(beachId);
        await displayBeach(beachData);
    } catch (error) {
        console.error(`Error fetching beach with ID ${beachId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId');
    await getBeachFromServer(beachId);

    document.querySelector(".goBack").addEventListener('click', () => {
        window.location.href = document.referrer;
    });
    document.querySelector('#remove-icon').addEventListener('click', async (event) => {
        event.preventDefault();
        await beachService.remove(beachId);
    });
    document.querySelector('#edit-icon').addEventListener('click', () => {
        window.location.href = `./beach_form.html?beachId=${beachId}`;
    });
});