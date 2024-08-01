import userService from './services/userService.js';

function createUserItem(UserData) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item user-list-item';

    const account = document.createElement('img');
    account.className = 'account-img';
    account.src = './images/acount-icon.png';
    account.alt = 'account';

    const title = document.createElement('p');
    title.textContent = UserData.fullName;

    const role = document.createElement('span');
    role.textContent = UserData.role;

    const deleteU = document.createElement('img');
    deleteU.className = 'delete_img';
    deleteU.src = './images/remove-icon.png';
    deleteU.alt = 'delete';

    deleteU.addEventListener('click', async (event) => {
        event.stopPropagation();
        try {
            await userService.remove(UserData.userId);
            await getUsersList();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    });

    const userDetails = document.createElement('div');
    userDetails.className = 'beach-details';
    userDetails.append(title, role);

    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.append(account, userDetails);

    const userActions = document.createElement('div');
    userActions.className = 'user-actions';
    userActions.append(deleteU);

    listItem.append(userCard,userActions);

    listItem.addEventListener('click', () => {
        window.location.href = `user.html?userId=${UserData.userId}`;
    });

    return listItem;
}

function populateUsersList(UsersData) {
    const user_container = document.querySelector('.users-container1');
    user_container.innerHTML = '';

    const userList = document.createElement('ul');
    userList.className = 'list-group list-group-flush user_list';
    UsersData.forEach(UserData => {
        const user = createUserItem(UserData);
        userList.appendChild(user);
    });
    user_container.appendChild(userList);
}

async function getUsersList(filters = '', isFirstLoad = false) {
    try {
        const UsersData = await userService.query(filters);
        populateUsersList(UsersData);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

window.onload = async () => {
    await getUsersList();

    const userId = localStorage.getItem('userId');
    const userData = await userService.getById(userId);
    const userName = document.getElementById("fullName");
    userName.textContent = userData.fullName || "No Name Provided";

    const userID= document.getElementById("userId");
    userID.textContent = userData.userId || "No Date Provided";

    const userEmail = document.getElementById("email");
    userEmail.textContent = userData.email || "No Date Provided";
};