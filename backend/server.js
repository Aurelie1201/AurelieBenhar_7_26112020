const express = require("express");
const appRouter = require('./app');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Salut</h1>');
});

server.use('/api/', appRouter);

server.listen(3000, ()=>{
    console.log('Serveur en route');
});