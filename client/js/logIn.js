import userService from './services/userService.js';

async function login(email, password) {
    console.log('EMAIL:', email);
    try {
        let data = await userService.loginUser(email, password)
        console.log('DATA:', data);
        // if the user is logged in, redirect to the home page
        if (data.token) {
            window.location.href = '../index.html';
        }
    }
    catch (error) {
        console.log('ERROR:', error);
    }
}

window.onload = () => {
    document.getElementById('sign-up-btn').addEventListener('click', () => {
        window.location.href = 'sign_up.html'; 
    });

    document.querySelector('#log-in-btn').addEventListener('click', async() => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        await login(email, password)
    });
}


