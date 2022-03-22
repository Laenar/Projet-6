const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Sauces = require('./models/sauces.js');

const userName = 'primaryUser@admin';
const databasePass = 'uPOzov04B9F8jEjh';

mongoose.connect('mongodb+srv://primaryUser:'+databasePass+'@cluster0.rmwua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new sauces({
        ...req.body
    });
    Sauces.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  });

app.get('/api/sauces', (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces/:id', (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
});


module.exports = app;

/*
 {
        userId :'',
        name :'fdbvds',
        manufacturer :'dsvdsv',
        description : 'sdwvdvdswvdsvdsvdsvdsvdsv',
        mainPepper : 'dvdsv',
        imageUrl : 'sdvdsv.csqc',
        heat :9,
        likes :10,
        dislikes : 12,
        usersLiked : {

        },
        usersDisliked : {}
      },
 */