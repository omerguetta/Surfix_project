const express = require('express');
const router = express.Router();
const beachesController = require('../controllers/beachesController');

router.get('/', beachesController.getBeaches);
router.get('/:beachId', beachesController.getBeach);
router.post('/', beachesController.addBeach);
router.put('/:beachId', beachesController.updateBeach);
router.delete('/:beachId', beachesController.deleteBeach);

module.exports = router;
