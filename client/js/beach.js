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
        const response = await fetch(`https://surfix.onrender.com/api/beach/${beachId}`);
        const beachData = await response.json();
        await displayBeach(beachData);
    } catch (error) {
        console.error(`Error fetching beach with ID ${beachId}:`, error);
    }
}

async function handleDeleteBeach(beachId) {
    try {
        console.log(beachId);
        const response = await fetch(`https://surfix.onrender.com/api/beach/${beachId}`, {
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

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId');
    await getBeachFromServer(beachId);

    document.querySelector(".goBack").addEventListener('click', () => {
        window.location.href = document.referrer;
    });
    document.querySelector('#remove-icon').addEventListener('click', (event) => {
        event.preventDefault();
        handleDeleteBeach(beachId);
    });
    document.querySelector('#edit-icon').addEventListener('click', () => {
        window.location.href = `./beach_form.html?beachId=${beachId}`;
    });
});