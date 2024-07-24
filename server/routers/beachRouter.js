const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController.js');

router.get('/',beachController.getBeaches);
router.get('/:beachId', beachController.getBeach);
router.post('/', beachController.addBeach);
router.put('/:beachId', beachController.updateBeach);
router.delete('/:beachId', beachController.deleteBeach);

module.exports = router;
