import userService from "./services/userService.js";
window.onload = () => {
    document.querySelector('#sign-up-btn').addEventListener('click', async(event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let fullName = document.getElementById('full-name').value;
        let userName = document.getElementById('user-name').value;
       
        try {
            let data = await userService.registerUser({ email, password, fullName, userName });
            console.log('DATA:', data);
            if (data) {
                window.location.href = 'index.html';
            }
        }
        catch (error) {
            console.log('ERROR:', error);
        }
    });
}