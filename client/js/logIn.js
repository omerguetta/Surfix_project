import userService from './services/userService.js';

async function login(email, password) {
    console.log('EMAIL:', email);
    // let data = userService.loginUser(email, password);
    console.log('DATA:' ,data);
}

window.onload = () => {
    document.getElementById('sign-up-btn').addEventListener('click', function() {
        window.location.href = 'sign_up.html'; 
    });

    document.getElementById('log-in-btn').addEventListener('click', async() => {
        preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        await login(email, password)
    });
}


