const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConnection } = require('../db_connection');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'secret';

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    authenticateUser,
    isUserExists
}

async function query() {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute('SELECT userId, userName, fullName, email, age, surfingLevel, weight, height FROM tbl_122_user');
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getById(userId) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(`SELECT user_id, user_name, f_name, l_name, phone, email, age, surfing_level, weight, height FROM tbl_122_user WHERE user_id = '${userId}'`);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        return rows[0];
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
}

async function add(body) {
    try {
        const connection = await dbConnection.connect();
        const { userName, firstName, lastName, email, password, age, surfingLevel, weight, height, role } = body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await connection.execute(
            `INSERT INTO tbl_122_user (user_name, f_name, l_name, email, password, age, surfing_level, weight, height,role) VALUES ("${userName}","${firstName}","${lastName}","${email}","${hashedPassword}",${age},"${surfingLevel}",${weight},${height},"${role}")`);
        return { userName, firstName, lastName, email, age, surfingLevel, weight, height, role };
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

async function update(body, userId) {
    try {
        const connection = await dbConnection.connect();
        const {
            userName,
            firstName,
            lastName,
            email,
            password,
            age,
            surfingLevel,
            weight,
            height
        } = body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await connection.execute(
            `UPDATE tbl_122_user SET user_name = ${userName},
            f_name = ${firstName},
            l_name = ${lastName},
            email = ${email},
            password = ${hashedPassword},
            age = ${age},
            surfing_level = ${surfingLevel},
            weight = ${weight},
            height = ${height} 
            WHERE user_id = ${userId}`
        );
        return {
            userId,
            userName,
            firstName,
            lastName,
            email,
            age,
            surfingLevel,
            weight,
            height
        };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function remove(userId) {
    try {
        const connection = await dbConnection.connect();
        const [result] = await connection.execute(`DELETE FROM tbl_122_user WHERE user_id = '${userId}'`);
        return { message: 'Session deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

async function authenticateUser(email, password) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(
            `SELECT * FROM tbl_122_user WHERE email = '${email}'`
        );

        if (rows.length === 0) {
            throw new Error('User not found');
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(password === user.password);
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            {
                userId: user.user_id,
                userName: user.user_name,
                userRole: user.role
            },
            jwtSecret,
            { expiresIn: '1h' }
        );

        return {
            userId: user.user_id,
            userName: user.user_name,
            token
        };
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}

async function isUserExists(userName, email) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(
            `SELECT COUNT(*) AS count FROM tbl_122_user WHERE user_name='${userName}' OR email='${email}'`,
            [userName, email]
        );
        return rows[0].count > 0;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}