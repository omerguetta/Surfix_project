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
        return userData;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');
    const user = await getUser(userId);
    await displayUser(user);

    if (user.role === 'admin') {
        document.querySelectorAll('.admin').forEach(item => {
            item.style.visibility = 'visible';
        });
    }

    if (user.stars === 0) {
        document.querySelectorAll('.beginner').forEach(item => {
            item.style.visibility = 'visible';
        });
    }

    document.querySelectorAll('#account-link').forEach(item => {
        item.addEventListener('click', () => {
            const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
            accountModal.show();
        });
    });

    console.log(user.stars);
    document.querySelectorAll('.profile-rating').forEach(item => {
        item.textContent = `★ ${user.stars}`;
    });
});
