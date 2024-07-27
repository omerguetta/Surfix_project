const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController.js');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware.js');

router.get('/', sessionController.getSessions);
router.get('/:sessionId', sessionController.getSession);
router.post('/', sessionController.addSession);
router.put('/:sessionId', sessionController.updateSession);
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;
