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

async function getUserFromServer(UserId) {
    try {
        const userData = await userService.getById(UserId);
        console.log(userData);
        await displayUser(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${UserId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    await getUserFromServer(userId);

    document.querySelector(".goBack").addEventListener('click', () => {
        window.location.href = document.referrer;
    });

    // document.querySelector(".edit-btn").addEventListener('click', () => {
    //     window.location.href = `./update_user.html?userId=${UserData.userId}`;
    // });
    // document.querySelector('#remove-icon').addEventListener('click', async (event) => {
    //     event.preventDefault();
    //     await beachService.remove(beachId);
    // });
    // document.querySelector('#edit-icon').addEventListener('click', () => {
    //     window.location.href = `./beach_form.html?beachId=${beachId}`;
    // });
});
