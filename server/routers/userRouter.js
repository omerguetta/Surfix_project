const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {authenticateToken, authorizeRoles} = require('../middleware/authMiddleware.js');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.put('/:userId',  userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;