const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
//const Sauces = require('./models/sauces.js');

router.get('/', saucesCtrl.getAllProducts);
router.get('/:id', saucesCtrl.getOneProduct);

router.put('/:id', saucesCtrl.putOneProduct);
router.delete('/:id', saucesCtrl.deleteOneProduct);

module.exports = router;