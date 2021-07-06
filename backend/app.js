const express = require('express');
const app = express();
require('dotenv').config();

const usersRoutes = require('./routes/usersRoutes');

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');//Toutes les origines ont le droit d'accéder au serveur
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());//Remplace bodyParser.json()

app.use('/api/users/', usersRoutes);

module.exports = app;