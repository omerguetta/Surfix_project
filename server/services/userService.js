// const {dbConnection} = require('../db_connection');

// module.exports = {
//     query,
//     getById,
//     remove,
//     update,
//     add,
// }

// async function query(filters = {}) {
//     try {
//         const connection = await dbConnection.connect();

//         let whereClause = '';
//         let sortClause = '';
        
//         const values = [];

//         if (filters) {
//             // if(filters.date) {
//             //     if (whereClause) whereClause += ' AND ';
//             //     whereClause += `date = ?`;
//             //     values.push(filters.date);
//             // }

//             // if (filters.sortByDate) {
//             //     sortClause += ' ORDER BY date ASC';
//             // }
//         }

//         let sql = `SELECT * FROM tbl_122_user`;
//         if (whereClause) {
//             sql += ` WHERE (${whereClause})`;
//         }
//         if (sortClause) {
//             sql += sortClause;
//         }

//         const [rows] = await connection.execute(sql, values);
//         return rows;
//     } catch (error) {
//         console.error('Error executing query:', error);
//         throw error;
//     }
// }

// async function getById(userId) {
//     try {
//         const connection = await dbConnection.connect();
//         const [rows] = await connection.execute(`SELECT * FROM tbl_122_user WHERE user_id = ?;`, [userId]);
//         return rows[0];
//     } catch (error) {
//         console.error('Error getting user by ID:', error);
//         throw error;
//     }
// }

// async function add(body) {
//     try {
//         const connection = await dbConnection.connect();
//         const {
//             userName,
//             firstName,
//             lastName,
//             phone,
//             email,
//             password,
//             age,
//             surfingLevel,
//             weight,
//             height
//         } = body;
//         const [result] = await connection.execute(
//             'INSERT INTO tbl_122_user (user_name, f_name, l_name, phone, email, password, age, surfling_level, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//             [userName, firstName, lastName, phone, email, password, age, surfingLevel, weight, height]
//         );
//         return {
//             userName,
//             firstName,
//             lastName,
//             phone,
//             email,
//             age,
//             surfingLevel,
//             weight,
//             height
//         };
//     } catch (error) {
//         console.error('Error adding user:', error);
//         throw error;
//     }
// }

// async function update(body, userId) {
//     try {
//         const connection = await dbConnection.connect();
//         const {
//             userName,
//             firstName,
//             lastName,
//             phone,
//             email,
//             password,
//             age,
//             surfingLevel,
//             weight,
//             height
//         } = body;
//         const [result] = await connection.execute(
//             'UPDATE tbl_122_user SET user_name = ?, f_name = ?, l_name = ?, phone = ?, email = ?, password = ?, age = ?, surfling_level = ?, weight = ?, height = ? WHERE user_id = ?',
//             [userName, firstName, lastName, phone, email, password, age, surfingLevel, weight, height, userId]
//         );
//         return {
//             userId,
//             userName,
//             firstName,
//             lastName,
//             phone,
//             email,
//             age,
//             surfingLevel,
//             weight,
//             height
//         };
//     } catch (error) {
//         console.error('Error updating user:', error);
//         throw error;
//     }
// }

// async function remove(userId) {
//     try {
//         const connection = await dbConnection.connect();
//         const [result] = await connection.execute('DELETE FROM tbl_122_user WHERE user_id = ?', [userId]);
//         return { message: 'Session deleted successfully' };
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// }
