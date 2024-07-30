document.addEventListener('DOMContentLoaded', function ()  {
    const authToken = localStorage.getItem('token');
    
    if (!authToken || authToken === 'undefined') {
        window.location.href = 'login.html';
    }
    
    document.querySelector('#logout').addEventListener('click', () => {
        console.log('Logout clicked');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = './login.html';
    });

});
