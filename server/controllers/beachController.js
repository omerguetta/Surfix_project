const beachService = require('../services/beachService.js');

module.exports = {
    getBeach,
    getBeaches,
    deleteBeach,
    updateBeach,
    addBeach,
}

async function getBeaches(req, res) {
    try {
        const { name, maxDistance, sortByName } = req.query;
        const filters = {};

        if (name) filters.name = name;
        if (maxDistance) filters.maxDistance = parseInt(maxDistance);
        if (sortByName) filters.sortByName = sortByName;

        const rows = await beachService.query(filters);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve beaches', error: error.message });
    }
}

async function getBeach(req, res) {
    try {
        const beach = await beachService.getById(req.params.beachId);
        if (beach) {
            res.json(beach);
        } else {
            res.status(404).json({ message: 'Beach not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve beach', error: error.message });
    }
}

async function addBeach(req, res) {
    try {
        const beach = req.body;
        const addedBeach = await beachService.add(beach);
        res.send({ addedBeach });
    } catch (error) {
        console.error('Error adding beach:', error);
        res.status(500).json({ message: 'Failed to add beach', error: error.message });
    }
}

async function updateBeach(req, res) {
    try {
        const beachId = req.params.beachId;
        const beach = req.body;
        const updatedBeach = await beachService.update(beach, beachId);
        if (updatedBeach) {
            res.json(updatedBeach);
        } else {
            res.status(404).json({ message: 'Beach not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update beach', error: error.message });
    }
}

async function deleteBeach(req, res) {
    try {
        const beachId = req.params.beachId;
        const result = await beachService.remove(beachId);
        if (result) {
            res.send({ result });
        } else {
            res.status(404).json({ message: 'Beach not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete beach', error: error.message });
    }
}