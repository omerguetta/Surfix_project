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
    await getBeachFromServer(beachId);
});