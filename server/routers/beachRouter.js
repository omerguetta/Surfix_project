const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController.js');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware.js');

router.get('/', authenticateToken, beachController.getBeaches);
router.get('/:beachId', authenticateToken, beachController.getBeach);
router.post('/', authenticateToken, beachController.addBeach);
router.put('/:beachId', authenticateToken, beachController.updateBeach);
router.delete('/:beachId', authenticateToken, beachController.deleteBeach);

module.exports = router;
