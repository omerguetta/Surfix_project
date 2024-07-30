import userService from "./services/userService.js";
window.onload = () => {
    document.querySelector('#sign-up').addEventListener('click', async(event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let fullName = document.getElementById('full-name').value;
        let userName = document.getElementById('user-name').value;
       
        try {
            let data = await userService.registerUser({ email, password, fullName, userName });
            if (data) {
                window.location.href = 'index.html';
            }
        }
        catch (error) {
            console.error('ERROR:', error);
        }
    });
}