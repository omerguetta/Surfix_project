const sessionService = require('../services/sessionService.js');

module.exports = {
    getSession,
    getSessions,
    deleteSession,
    updateSession,
    addSession,
}

async function getSessions(req, res) {
    try {
        const {Date} = req.query;
        const filters = {};

        //if we need to change the date format
        // if (Date) filters.Date = new Date(Date);
        filters.Date = Date;
        // if (sortByName) filters.sortByName = sortByName;

        const rows = await sessionService.query(filters);
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve sessions', error: error.message});
    }
}

async function getSession(req, res) {
    try {
        console.log('getSession', req.params);
        const session = await sessionService.getById(req.params.sessionId);
        if (session) {
            res.json(session);
        } else {
            res.status(404).json({message: 'Session not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve session', error: error.message});
    }
}

async function addSession(req, res) {
    try {
        const session = req.body;
        const addedSession = await sessionService.add(session);
        res.status(201).json(addedSession);
    } catch (error) {
        console.error('Error adding session:', error);
        res.status(500).json({ message: 'Failed to add session', error: error.message });
    }
}

async function updateSession(req, res) {
    try {
        const sessionId = req.params.sessionId;
        const session = req.body;
        const updatedSession = await sessionService.update(session, sessionId);
        if (updatedSession) {
            res.json(updatedSession);
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error){
        res.status(500).json({ message: 'Failed to update session', error: error.message });
    }
}

async function deleteSession(req, res) {
    try {
        const sessionId = req.params.sessionId;
        const result = await sessionService.remove(sessionId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete session', error: error.message });
    }
}