// const userService = require('../services/userService.js');

// module.exports = {
//     getUser,
//     getUsers,
//     deleteUser,
//     updateUser,
//     addUser,
// }

// async function getUsers(req, res) {
//     try {
//         const {name, maxDistance, sortByName} = req.query;
//         const filters = {};

//         if (name) filters.name = name;
//         if (maxDistance) filters.maxDistance = parseInt(maxDistance);
//         if (sortByName) filters.sortByName = sortByName;

//         const rows = await userService.query(filters);
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({message: 'Failed to retrieve users', error: error.message});
//     }
// }

// async function getUser(req, res) {
//     try {
//         console.log('getUser', req.params);
//         const user = await userService.getById(req.params.userId);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({message: 'User not found'});
//         }
//     } catch (error) {
//         res.status(500).json({message: 'Failed to retrieve user', error: error.message});
//     }
// }

// async function addUser(req, res) {
//     try {
//         const user = req.body;
//         const addedUser = await userService.add(user);
//         res.status(201).json(addedUser);
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ message: 'Failed to add user', error: error.message });
//     }
// }

// async function updateUser(req, res) {
//     try {
//         const userId = req.params.userId;
//         const user = req.body;
//         const updatedUser = await userService.update(user, userId);
//         if (updatedUser) {
//             res.json(updatedUser);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error){
//         res.status(500).json({ message: 'Failed to update user', error: error.message });
//     }
// }

// async function deleteUser(req, res) {
//     try {
//         const userId = req.params.userId;
//         const result = await userService.remove(userId);
//         if (result) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete user', error: error.message });
//     }
// }