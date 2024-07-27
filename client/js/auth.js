
window.onload = function() {
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
        window.location.href = 'login.html';
    }
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('authToken'); // Clear token
        window.location.href = 'login.html'; // Redirect to login page
    });
};