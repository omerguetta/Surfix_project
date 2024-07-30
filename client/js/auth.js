document.addEventListener('DOMContentLoaded', function ()  {
    const authToken = localStorage.getItem('token');
    const authTokenTtl = localStorage.getItem('token_ttl');
    
    if (!authToken || !authTokenTtl || authTokenTtl < Date.now()) {
        window.location.href = 'login.html';
    }
    
    document.querySelector('#logout').addEventListener('click', () => {
        console.log('Logout clicked');
        localStorage.removeItem('token');
        localStorage.removeItem('token_ttl');
        localStorage.removeItem('userId');
        window.location.href = './login.html';
    });

});
