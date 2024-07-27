
window.onload = function() {
    const authToken = localStorage.getItem('token');
    
    if (!authToken || authToken.ttl > Date.now()) {
        window.location.href = 'login.html';
    }
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
};