const Product = require('../models/sauces');

exports.getAllProducts = (req, res, next) => {
  Product.find().then(
    (products) => {
      const mappedProducts = products.map((product) => {
        product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
        return product;
      });
      res.status(200).json(mappedProducts);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
};

exports.getOneProduct = (req, res, next) => {
  Product.findById(req.params.id).then(
    (product) => {
      if (!product) {
        return res.status(404).send(new Error('Product not found!'));
      }
      product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
      res.status(200).json(product);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

exports.putOneProduct = (req, res, next) => {
   
};
  
exports.deleteOneProduct = (req, res, next) => {

};