function createBeachItem(beachData) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item beach-list-item';

    const wave = document.createElement('img');
    wave.className = 'wave_img';
    wave.src = '../images/wave.svg';
    wave.alt = 'wave';

    const title = document.createElement('p');
    title.textContent = beachData.name;

    const distance = document.createElement('span');
    distance.textContent = beachData.distance;

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
        window.location.href = `beach-page.html?beachId=${beachData.id}`;
    });

    return listItem;
}

function populateBeachesList(beachesData) {
    const beachList = document.createElement('ul');
    beachList.className = 'list-group list-group-flush beach_list';
    beachesData.forEach(beachData => {
        const beach = createBeachItem(beachData);
        beachList.appendChild(beach);
    });
    document.querySelector('.beaches_container').appendChild(beachList);
}

async function getBeachesListFromServer() {
    try {
        const response = await fetch("http://localhost:3000/api/beach");
        const beachesData = await response.json();
        populateBeachesList(beachesData);
    } catch (error) {
        console.error('Error fetching beaches:', error);
    }
}

window.onload = () => {
    getBeachesListFromServer();
};