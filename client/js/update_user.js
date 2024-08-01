import userService from "./services/userService.js";

async function handleFormSubmit(event) {
    event.preventDefault();
    const userId = event.target.dataset.userId;
    const role = document.querySelector('.form-check-input.role:checked').getAttribute('id').split('-')[1];
    const userData= {
        fullName: event.target.fullName.value,
        stars: event.target.stars.value,
        role
    };

    await userService.update(userData, userId);
    window.location.href = `./user.html?userId=${userId}`;
}

async function displayUser(user = {}) {
    const form = document.querySelector('.user-form');
    if (form) {
        form.fullName.value = user.fullName;
        form.stars.value = user.stars;

        if (user.userId) {
            form.setAttribute('data-user-id', user.userId);
        } else {
            form.removeAttribute('data-user-id');
        }
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found');
    }
}

async function getUser(userId) {
    const userData = await userService.getById(userId);
    await displayUser(userData);
    return userData;
}

function initRoleCheckboxes(role) {
    const roleCheckboxes = document.querySelectorAll('.form-check-input.role');

    roleCheckboxes.forEach(checkbox => {
        if (checkbox.getAttribute('id').includes(role)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });

    roleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                roleCheckboxes.forEach(cb => {
                    if (cb !== checkbox) cb.checked = false;
                });
            }
        });
    });
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const user = await getUser(userId);

    initRoleCheckboxes(user.role);
    document.querySelector('.submit-btn').textContent = 'Update';

    const deleteAcBtn = document.querySelector('.dlt-btn');
    deleteAcBtn.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
            await userService.remove(userId);
            window.location.href = './user_management_page.html';
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });

});