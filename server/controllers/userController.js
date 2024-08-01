const userService = require('../services/userService.js');

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

async function registerUser(req, res) {
    try {
        const { userName, fullName, email, password, age, surfingLevel, weight, height, role } = req.body;

        const userExists = await userService.isUserExists(userName, email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const currentUser = req.user;
        let userRole = 'regular';
        if (currentUser && currentUser.role === 'admin' && role) {
            userRole = role;
        }

        const newUser = {
            userName,
            fullName,
            email,
            password,
            age: parseInt(age) || 0,
            surfingLevel: surfingLevel || 'null',
            weight: weight || 0,
            height: height || 0,
            role: userRole
        };

        await userService.add(newUser);
        const authenticatedUser = await userService.authenticateUser(email, password);
        res.status(201).json(authenticatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const result = await userService.authenticateUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password' });
    }
};

async function getUsers(req, res) {
    try {
        const { fullName, sortByName } = req.query;
        const filters = {};

        if (fullName) filters.fullName = fullName;
        if (sortByName) filters.sortByName = sortByName;

        const users = await userService.query(filters);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.userId;
        const user = req.body;
        const updatedUser = await userService.update(user, userId);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.userId;
        const result = await userService.remove(userId);
        if (result) {
            res.send({ result });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
}