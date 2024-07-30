import userService from "./services/userService.js";

async function displayUser(user) {
    const fullName = document.querySelector("#accountFullName");
    fullName.textContent = `${user.fullName}`;

    const email = document.querySelector("#accountEmail");
    email.textContent = `${user.email}`;

    const userName = document.querySelector("#accountUserName");
    userName.textContent = `${user.userName}`;

}

async function getUser(userId) {
    try {
        const userData = await userService.getById(userId);
        console.log(userData);
        await displayUser(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
    }
}

window.onload = (async () => {
    const userId = localStorage.getItem('userId');
    await getUserFromServer(userId);

    document.querySelectorAll('#account-link').forEach(item => {
        item.addEventListener('click', () => {
            const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
            accountModal.show();
        });
    });
});


