const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const saucesRoutes = require('./routes/sauces.js');
const userRoutes = require('./routes/user.js');

mongoose.connect('mongodb+srv://primaryUser:'+process.env.PASSWORD+'@cluster0.rmwua.mongodb.net/piiquante?retryWrites=true&w=majority',
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


app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use(process.env.PATH_IMG, express.static(path.join(__dirname, 'images')));

module.exports = app;
