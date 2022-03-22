const Sauce = require('../models/sauces');

exports.getAllProducts = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
};

exports.putOneProduct = (req, res, next) => {
   
};
  
exports.deleteOneProduct = (req, res, next) => {

};