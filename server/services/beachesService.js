const {dbConnection} = require('../db_connection');

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
}

async function query() {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(`SELECT * FROM tbl_122_beach`);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getById(beachId) {
    try {
        const connection = await dbConnection.connect();
        const [rows] = await connection.execute(`SELECT * FROM tbl_122_beach WHERE id = ?;`, [beachId]);
        return rows[0];
    } catch (error) {
        console.error('Error getting beach by ID:', error);
        throw error;
    }
}

async function add(body) {
    try {
        const connection = await dbConnection.connect();
        const {
            name,
            distance,
            onshore_wind,
            rising_tide,
            air_temperature,
            wave_height,
            wave_direction,
            water_temperature,
            visibility
        } = body;
        const [result] = await connection.execute(
            'INSERT INTO tbl_122_beach (name, distance, onshore_wind, rising_tide, air_temperature, wave_height, wave_direction, water_temperature, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, distance, onshore_wind, rising_tide, air_temperature, wave_height, wave_direction, water_temperature, visibility]
        );
        return {
            name,
            distance,
            onshore_wind,
            rising_tide,
            air_temperature,
            wave_height,
            wave_direction,
            water_temperature,
            visibility
        };
    } catch (error) {
        console.error('Error adding beach:', error);
        throw error;
    }
}

async function update(body, beachId) {
    try {
        const connection = await dbConnection.connect();
        const {
            name,
            distance,
            onshore_wind,
            rising_tide,
            air_temperature,
            wave_height,
            wave_direction,
            water_temperature,
            visibility
        } = body;
        const [result] = await connection.execute(
            'UPDATE dbShnkr24stud.tbl_122_beach SET name = ?, distance = ?, onshore_wind = ?, rising_tide = ?, air_temperature = ?, wave_height = ?, wave_direction = ?, water_temperature = ?, visibility = ? WHERE id = ?',
            [name, distance, onshore_wind, rising_tide, air_temperature, wave_height, wave_direction, water_temperature, visibility, beachId]
        );
        return {
            id: beachId,
            name,
            distance,
            onshore_wind,
            rising_tide,
            air_temperature,
            wave_height,
            wave_direction,
            water_temperature,
            visibility
        };
    } catch (error) {
        console.error('Error updating beach:', error);
        throw error;
    }
}

async function remove(beachId) {
    try {
        const connection = await dbConnection.connect();
        const [result] = await connection.execute(`DELETE FROM dbShnkr24stud.tbl_122_beach WHERE id = ?`, [beachId]);
        return {message: 'Beach deleted successfully'};
    } catch (error) {
        console.error('Error deleting beach:', error);
        throw error;
    }
}