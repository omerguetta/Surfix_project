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
        window.location.href = `beach_page.html?beachId=${beachData.id}`;
    });

    return listItem;
}

function populateBeachesList(beachesData) {
    const beach_container = document.querySelector('.beaches_container');
    beach_container.innerHTML = '';

    const beachList = document.createElement('ul');
    beachList.className = 'list-group list-group-flush beach_list';
    beachesData.forEach(beachData => {
        const beach = createBeachItem(beachData);
        beachList.appendChild(beach);
    });
    beach_container.appendChild(beachList);
}

async function getBeachesListFromServer(filters = '', isFirstLoad = false) {
    try {
        const response = await fetch(`http://localhost:3000/api/beach${filters}`);
        const beachesData = await response.json();
        if (isFirstLoad) {
            setMinMaxDistance(beachesData);
        }
        populateBeachesList(beachesData);
    } catch (error) {
        console.error('Error fetching beaches:', error);
    }
}

function updateFilters() {
    const searchInput = document.getElementById('searchInput');
    const distanceInput = document.getElementById('maxDistance');

    const newParams = new URLSearchParams();

    if (searchInput.value.trim()) {
        newParams.set('name', searchInput.value.trim());
    }
    if (distanceInput.value.trim()) {
        newParams.set('maxDistance', distanceInput.value.trim());
    }

    history.pushState({}, '', `?${newParams.toString()}`);
    getBeachesListFromServer(`?${newParams.toString()}`);
}

function setMinMaxDistance(beachesData) {

    const maxDistance = Math.max(...beachesData.map(beach => beach.distance));
    const minDistance = Math.min(...beachesData.map(beach => beach.distance));

    const distanceInput = document.getElementById('maxDistance');
    distanceInput.max = maxDistance;
    distanceInput.min = minDistance;
    distanceInput.value = maxDistance;

    document.getElementById('rangeValue').textContent = maxDistance.toString();
}

window.onload = () => {
    document.getElementById('searchInput').addEventListener('input', updateFilters);
    document.querySelector('.add-new-beach').addEventListener('click', ()=>{
        window.location.href = '../pages/beach_form.html';
    });
    document.getElementById('maxDistance').addEventListener('change', (event) => {
        document.getElementById('rangeValue').textContent = event.target.value;
        updateFilters();
    });
    getBeachesListFromServer(window.location.search, true);
};