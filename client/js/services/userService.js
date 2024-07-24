// async function query(filters = {}) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/user/${filters}`);
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching users:', error);
//     }
// }

// async function getById(userId) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/user/${userId}`);
//         return await response.json();
//     } catch (error) {
//         console.error(`Error fetching user with ID ${userId}:`, error);
//     }
// }

// async function add(body) {
//     try {
//         const response = await fetch('http://localhost:3000/api/user', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(body)
//         });
//         if (response.ok) {
//             window.location.href = document.referrer;
//         } else {
//             console.error(`Failed to create user:`, response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error(`Error creating user:`, error);
//     }
// }

// async function update(body, userId) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(body)
//         });
//         if (response.ok) {
//             window.location.href = document.referrer;
//         } else {
//             console.error(`Failed to update user:`, response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error(`Error updating user:`, error);
//     }
// }

// async function remove(userId) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
//             method: 'DELETE'
//         });
//         if (response.ok) {
//             window.location.href = 'for_you.html';
//         } else {
//             console.error('Failed to delete user:', response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// }

// const userService = {
//     query,
//     getById,
//     add,
//     update,
//     remove
// };

// export default userService;