
window.onload = () => {
    console.log('Authenticating user');
    const authToken = localStorage.getItem('access_token');
    const authTokenTtl = localStorage.getItem('access_token_ttl');
    
    if (!authToken || !authTokenTtl || authTokenTtl < Date.now()) {
        window.location.href = 'login.html';
    }
    
    document.getElementById('logout').addEventListener('click', function() {
        console.log('Logout clicked');
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_ttl');
        window.location.href = './login.html';
    });
};