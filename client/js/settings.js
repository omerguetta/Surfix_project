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

    const userDisplay = document.querySelectorAll('#account-link');
    if (userDisplay) {
        await displayUser(user);
        userDisplay.forEach(item => {
            item.addEventListener('click', () => {
                const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
                accountModal.show();
            });
        });
    }

    if (user.role === 'admin') {
        console.log('User is an admin');
        window.location.href = './admin_page.html';
    }

    if (user.stars === 0) {
        document.querySelectorAll('.beginner').forEach(item => {
            item.style.visibility = 'visible';
        });
        document.querySelectorAll('.intermediate').forEach(item => {
            item.style.visibility = 'hidden';
        });
    }

    const starsContainer = document.querySelectorAll('.profile-rating');
    if (starsContainer) {
        starsContainer.forEach(item => {
            item.textContent = `★ ${user.stars}`;
        });
    }
});
