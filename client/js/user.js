import userService from "./services/userService.js";

async function displayUser(user) {
    const userName = document.getElementById("fullName");
    userName.textContent = user.fullName;

    const starsUser = document.querySelector(".profile-rating");
    starsUser.textContent = `★ ${user.stars}`;

    const userId = document.getElementById("userId");
    userId.textContent = user.userId;

    const email = document.getElementById("email");
    email.textContent = user.email;

    const age = document.querySelector(".age");
    age.textContent = user.age;

    const surfingLevel = document.querySelector(".surfingLevel");
    surfingLevel.textContent = user.surfingLevel;

    const weight = document.querySelector(".weight");
    weight.textContent = user.weight.toFixed(2);

    const height = document.querySelector(".height");
    height.textContent = user.height.toFixed(2);

    const stars = document.querySelector(".stars");
    stars.textContent = user.stars;

    const rowing = document.querySelector(".goalsRowing");
    rowing.textContent = user.rowing;

    const speed = document.querySelector(".goalsSpeed");
    speed.textContent = user.speed;

    const waveLeft = document.querySelector(".waveLeft");
    waveLeft.textContent = user.waveLeft;

    const waveRight = document.querySelector(".waveRight");
    waveRight.textContent = user.waveRight;

    document.querySelector(".edit-btn").addEventListener('click', () => {
        window.location.href = `./update_user.html?userId=${user.userId}`;
    });
}

async function getUser(UserId) {
    try {
        const userData = await userService.getById(UserId);
        await displayUser(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${UserId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    await getUser(userId);

    const deleteAcBtn = document.querySelector('.dlt-btn');
    deleteAcBtn.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
            await userService.remove(userId);
            window.location.href = document.referrer;
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });
});
