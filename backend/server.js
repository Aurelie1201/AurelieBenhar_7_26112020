const express = require("express");

const server = express();

server.get('/', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Salut</h1>');
});

server.listen(3000, ()=>{
    console.log('Serveur en route');
});