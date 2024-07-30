const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const {authenticateToken, authorizeRoles} = require('../middleware/authMiddleware.js');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/',authenticateToken, authorizeRoles('admin') ,userController.getUsers);
router.get('/:userId',authenticateToken, userController.getUser);
router.put('/:userId', authenticateToken, userController.updateUser);
router.delete('/:userId',authenticateToken, userController.deleteUser);

module.exports = router;