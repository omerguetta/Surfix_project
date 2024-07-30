import userService from "./services/userService.js";

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    console.log(form);
    const formData = new FormData(form);
    console.log(formData);
    const userData = Object.fromEntries(formData);
    const userId = form.getAttribute('data-user-id');

    if(userId) {
        await userService.update(userData, userId);
    }
    // } else {
    //     await userService.add(userData);
    // }
}

async function displayUser(user={}) {
    const form = document.querySelector('.user-form');
    if (form) {
        form.fullName.value = user.fullName;
        form.stars.value = user.stars;

        if (user.userId) {
            form.setAttribute('data-user-id', user.userId);
            // document.querySelector('.cancel-btn').addEventListener('click', async (event) => {
            //     event.preventDefault();
            //     await userService.remove(user.userId);
            // });
        } else {
            form.removeAttribute('data-user-id');
        }
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form not found');
    }
}

async function getUserFromServer(userId) {
    const userData = await userService.getById(userId);
    console.log(userData);
    await displayUser(userData);
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userId) {
        // document.querySelector('.delete-btn').style.visibility = 'visible';
        document.querySelector('.submit-btn').textContent = 'Update';
        await getUserFromServer(userId);
    } else {
        // document.querySelector('.delete-btn').style.visibility = 'hidden';
        document.querySelector('.submit-btn').textContent = 'Submit';
        await displayUser();
    }
    // document.querySelector(".to-user-page").addEventListener('click', () => {
    //     window.location.href = document.referrer;
    // });
});