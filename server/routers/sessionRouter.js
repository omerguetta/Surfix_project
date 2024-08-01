const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController.js');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware.js');

router.get('/', authenticateToken, sessionController.getSessions);
router.get('/:sessionId', authenticateToken, sessionController.getSession);
router.post('/', authenticateToken, sessionController.addSession);
router.put('/:sessionId', authenticateToken, authorizeRoles("admin"), sessionController.updateSession);
router.delete('/:sessionId', authenticateToken, authorizeRoles("admin"), sessionController.deleteSession);

module.exports = router;
