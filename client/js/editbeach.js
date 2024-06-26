import beachService from "./services/beachService.js";

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const beachId = urlParams.get('beachId') || 2;
    console.log(beachId)
    await beachService.getBeach(beachId).then(beach => displayBeach(beach));
});

async function displayBeach(beach) {
    console.log(beach)
    const form = document.querySelector('.beach-form');
    if(form){
        form.name.value = beach.name;
        form.distance.value = beach.distance;
        form.onshore_wind.value = beach.onshore_wind || '';
        form.rising_tide.value = beach.rising_tide || '';
        form.air_temperature.value = beach.air_temperature || '';
        form.water_temperature.value = beach.water_temperature || '';
        form.wave_direction.value = beach.wave_direction || '';
        form.wave_height.value = beach.wave_height || '';
        form.visibility.value = beach.visibility || '';
    } else {
        console.error('Form not found');
    }
}