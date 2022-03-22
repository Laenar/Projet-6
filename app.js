const express = require('express');
const mongoose = require('mongoose');
const app = express();

const saucesRoutes = require('./routes/sauces.js');
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

app.use('/api/sauces', saucesRoutes);

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