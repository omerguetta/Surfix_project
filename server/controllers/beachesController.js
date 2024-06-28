const beachesService = require('../services/beachesService.js');

module.exports = {
    getBeach,
    getBeaches,
    deleteBeach,
    updateBeach,
    addBeach,
}

async function getBeaches(req, res) {
    const {name, maxDistance, spots} = req.query;

    const filters = {};
    if (name) filters.name = name;
    if (maxDistance) filters.maxDistance = parseInt(maxDistance);
    if (spots) filters.spots = spots.split(',').map(spot => parseInt(spot));

    const rows = await beachesService.query(filters);
    res.send(rows);
}

async function getBeach(req, res) {
    const beach = await beachesService.getById(req.params.beachId);
    res.send(beach);
}

async function addBeach(req, res) {
    const beach = req.body;
    await beachesService.add(beach);
    res.send(beach);
}

async function updateBeach(req, res) {
    const beach = await beachesService.update(req.body, req.params.beachId);
    res.send(beach);
}

async function deleteBeach(req, res) {
    await beachesService.remove(req.params.beachId);
    res.end();
}