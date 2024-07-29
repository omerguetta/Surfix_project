window.onload = () => {
    console.log('Authenticating user');
    const authToken = localStorage.getItem('access_token');
    const authTokenTtl = localStorage.getItem('access_token_ttl');
    
    if (!authToken || !authTokenTtl || authTokenTtl < Date.now()) {
        window.location.href = 'login.html';
    }
    
    const logoutBtns = document.querySelectorAll('.logout');

    logoutBtns.forEach(elem => {
        elem.addEventListener('click', () => {
            console.log('Logout clicked');
            localStorage.removeItem('access_token');
            localStorage.removeItem('access_token_ttl');
            localStorage.removeItem('userId');
            window.location.href = './login.html';
        });
    });
    // document.querySelector('.logout').addEventListener('click', () => {
    //     console.log('Logout clicked');
    //     localStorage.removeItem('access_token');
    //     localStorage.removeItem('access_token_ttl');
    //     localStorage.removeItem('userId');
    //     window.location.href = './login.html';
    // });
};