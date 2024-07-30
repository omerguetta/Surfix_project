import userService from "./services/userService.js";

async function displayUser(user) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = `
        <h1>${user.fullName}</h1>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Surfing Level:</strong> ${user.surfingLevel}</p>
        <p><strong>Weight:</strong> ${user.weight} kg</p>
        <p><strong>Height:</strong> ${user.height} cm</p>
    `;
}

async function getUser(userId) {
    try {
        const userData = await userService.getById(userId);
        await displayUser(userData);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
    }
}

window.onload = (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    // if (userId) {
    //     await getUser(userId);
    // } else {
    //     console.error('No userId found in URL parameters');
    // await getUserFromServer(userId);

    // Debugging output
    console.log('URL Parameters:', Array.from(urlParams.entries())); // Log all URL parameters
    console.log('User ID:', userId); // Log the userId to see if it's being retrieved correctly


    document.querySelectorAll('#account-link').forEach(item => {
        item.addEventListener('click', () => {
            const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
            accountModal.show();
        });
    });
});

/*window.onload = () => {
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
};*/


