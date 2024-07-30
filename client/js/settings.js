import userService from "./services/userService.js";

async function displayUser(user) {
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

async function getUserFromServer(userId) {
    try {
        const userData = await userService.getById(userId);
        await displayUser(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    await getUserFromServer(userId);

    console.log('URL Parameters:', Array.from(urlParams.entries())); 
    console.log('User ID:', userId); 


    document.querySelectorAll('#account-link').forEach(item => {
        item.addEventListener('click', () => {
            const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
            accountModal.show();
        });
    });
});




