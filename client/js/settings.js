
import userService from "./services/userService.js";

async function displayBeach(user) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = `
        <h1>${user.fullName}</h1>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Surfing Level:</strong> ${user.surfingLevel}</p>
        <p><strong>Weight:</strong> ${user.weight} kg</p>
        <p><strong>Height:</strong> ${user.height} cm</p>
    `;
}

async function getUser(userId) {
    try {
        const userData = await userService.getById(userId);
        await displayBeach(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userId) {
        await getUser(userId);
    } else {
        console.error('No userId found in URL parameters');
    }
});