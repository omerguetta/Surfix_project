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
        const [rows] = await connection.execute('SELECT userId, userName, fullName, email, age, surflingLevel, weight, height FROM tbl_122_user');
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getById(userId) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(`SELECT userId, userName, fullName, email, age, surflingLevel, weight, height FROM tbl_122_user WHERE userId = '${userId}'`);
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
        const { userName, fullName, email, password, age, surfingLevel, weight, height, role } = body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await connection.execute(
            `INSERT INTO tbl_122_user (userName, fullName, email, password, age, surfingLevel, weight, height,role) VALUES ("${userName}","${fullName}","${email}","${hashedPassword}",${age},"${surfingLevel}",${weight},${height},"${role}")`);
        return { userName, fullName, email, age, surfingLevel, weight, height, role };
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
            fullName,
            email,
            password,
            age,
            surfingLevel,
            weight,
            height
        } = body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await connection.execute(
            `UPDATE tbl_122_user SET userName = ${userName},
            fullName = ${fullName},
            email = ${email},
            password = ${hashedPassword},
            age = ${age},
            surfingLevel = ${surfingLevel},
            weight = ${weight},
            height = ${height} 
            WHERE userId = ${userId}`
        );
        return {
            userId,
            userName,
            fullName,
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
        const [result] = await connection.execute(`DELETE FROM tbl_122_user WHERE userId = '${userId}'`);
        return { message: 'Session deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

async function authenticateUser(email, password) {
    try {
        const connection = await dbConnection.connect();
  
        const [rows] = await connection.execute(`SELECT * FROM tbl_122_user WHERE email="${email}"`);
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
                userId: user.userId,
                userName: user.userName,
                userRole: user.role
            },
            jwtSecret,
            { expiresIn: '1h' }
        );

        return {
            userId: user.userId,
            userName: user.userName,
            token,
            ttl: Date.now() + 1000 * 600 * 600 //change it to 1 hour (1000 * 60 * 60)
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
            `SELECT COUNT(*) AS count FROM tbl_122_user WHERE userName='${userName}' OR email='${email}'`);
        return rows[0].count > 0;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}