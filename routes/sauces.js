const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post('/', auth, multer, saucesCtrl.addOneSauce);
router.post('/:id/like', auth, saucesCtrl.likeOneSauce);
router.put('/:id', saucesCtrl.updateOneSauce);
router.delete('/:id', saucesCtrl.deleteOneSauce);





module.exports = router;