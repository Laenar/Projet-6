const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.get('/', saucesCtrl.getAllSauces);
router.get('/:id', saucesCtrl.getOneSauce);

router.put('/:id', saucesCtrl.putOneSauce);
router.delete('/:id', saucesCtrl.deleteOneSauce);

module.exports = router;