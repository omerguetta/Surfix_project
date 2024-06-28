import beachesService from "./services/beachService.js";

window.onload = (async () => {
    // await displayBeaches();
    await beachesService.getBeaches()
        .then(beaches => {
            const beachList = createBeachList(beaches);
            document.querySelector('.beaches_container').append(beachList);
        });
});

async function displayBeaches() {
    const beaches = await beachesService.getBeaches();
    const beachList = createBeachList(beaches);
    document.querySelector('.beaches_container').append(beachList);
}

function createBeachList(beaches) {
    const beachList = document.createElement('ul');
    beachList.className = 'list-group list-group-flush beach_list';
    beaches.forEach(beach => {

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item beach-list-item';

        const wave = document.createElement('img');
        wave.className = 'wave_img';
        wave.src = '../images/wave.svg';
        wave.alt = 'wave';

        const title = document.createElement('p');
        title.textContent = beach.name;

        const distance = document.createElement('span');
        distance.textContent = beach.distance;

        const favorite = document.createElement('img');
        favorite.className = 'favorite_img';
        favorite.src = '../images/favorite.svg';
        favorite.alt = 'favorite';

        const arrow = document.createElement('img');
        arrow.className = 'arrow_img';
        arrow.src = '../images/arrow.svg';
        arrow.alt = 'arrow';

        const beachDetails = document.createElement('div');
        beachDetails.className = 'beach-details';
        beachDetails.append(title, distance);

        const beachCard = document.createElement('div');
        beachCard.className = 'beach-card';
        beachCard.append(wave, beachDetails);

        const beachActions = document.createElement('div');
        beachActions.className = 'beach-actions';
        beachActions.append(favorite, arrow);

        listItem.append(beachCard, beachActions);

        listItem.addEventListener('click', () => {
            window.location.href = `edit_beach.html?beachId=${beach.id}`;
        });

        beachList.appendChild(listItem);
    });
    return beachList;
}
