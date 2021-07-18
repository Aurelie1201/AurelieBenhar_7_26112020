const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const usersRoutes = require('./routes/usersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');//Toutes les origines ont le droit d'accéder au serveur
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());//Remplace bodyParser.json()

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users/', usersRoutes);
app.use('/api/messages/', messagesRoutes);
app.use('/api/comments/', commentsRoutes);

module.exports = app;