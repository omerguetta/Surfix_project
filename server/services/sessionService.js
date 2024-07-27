const { dbConnection } = require('../db_connection');

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
}

async function query(filters = {}) {
    try {
        const connection = await dbConnection.connect();

        let whereClause = '';
        let sortClause = '';

        const values = [];

        if (filters) {

            if (filters.date) {
                if (whereClause) whereClause += ' AND ';
                whereClause += `date = ?`;
                values.push(filters.date);
            }

            if (filters.sortByDate) {
                sortClause += ' ORDER BY date ASC';
            }
        }

        let sql = `SELECT * FROM tbl_122_session`;
        if (whereClause) {
            sql += ` WHERE (${whereClause})`;
        }
        if (sortClause) {
            sql += sortClause;
        }

        const [rows] = await connection.execute(sql, values);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getById(sessionId) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(`SELECT * FROM tbl_122_session WHERE session_id = '${sessionId}';`);
        return rows[0];
    } catch (error) {
        console.error('Error getting session by ID:', error);
        throw error;
    }
}

async function add(body) {
    try {
        const connection = await dbConnection.connect();
        const {
            date,
            name,
            userId,
            stars,
            location,
            duration,
            waveLeft,
            waveRight,
            maxSpeed
        } = body;
        const [result] = await connection.execute(
            `INSERT INTO tbl_122_session (date, name, user_id, stars, location, duration, wave_left, wave_right, max_speed) VALUES ('${date}','${name}',${userId},${stars},'${location}','${duration}',${waveLeft},${waveRight},${maxSpeed})`,
            [date, name, userId, stars, location, duration, waveLeft, waveRight, maxSpeed]

        );
        return {
            date,
            name,
            userId,
            stars,
            location,
            duration,
            waveLeft,
            waveRight,
            maxSpeed
        };
    } catch (error) {
        console.error('Error adding session:', error);
        throw error;
    }
}

async function update(body, sessionId) {
    try {
        const connection = await dbConnection.connect();
        const {
            date,
            name,
            userId,
            stars,
            location,
            duration,
            waveLeft,
            waveRight,
            maxSpeed
        } = body;
        const [result] = await connection.execute(
            `UPDATE tbl_122_session SET date = '${date}', name = '${name}', user_id = ${userId}, stars = ${stars}, location = '${location}', duration = '${duration}', wave_left = ${waveLeft}, wave_right = ${waveRight}, max_speed = ${maxSpeed} WHERE session_id = '${sessionId}'`);
        return {
            sessionId,
            date,
            name,
            userId,
            stars,
            location,
            duration,
            waveLeft,
            waveRight,
            maxSpeed
        };
    } catch (error) {
        console.error('Error updating session:', error);
        throw error;
    }
}

async function remove(sessionId) {
    try {
        const connection = await dbConnection.connect();
        const [result] = await connection.execute(`DELETE FROM tbl_122_session WHERE session_id = ${sessionId}`);
        return { message: 'Session deleted successfully' };
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
}
