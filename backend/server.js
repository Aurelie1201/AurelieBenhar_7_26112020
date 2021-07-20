const http = require('http');
const app = require('./app');

/**
 * Return a valid port whether given as a number or a string
 * @param {*} val 
 * @returns port
 */
const normalizePort = val =>{
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    };
    if (port >= 0){
        return port;
    };
    return false;
};

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Find different errors and deal with them appropriately
 * It is then saved in the server
 * @param {*} error 
 */
const errorHandler = error =>{
    if (error.syscall !== 'listen'){
        throw error;
    };
    const address = server.adress();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

/**
 * logs the port the server is running on
 */
 server.on('error', errorHandler);
 server.on('listening', () =>{
     const address = server.address();
     const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
     console.log('listening on ' + bind);
 });

server.listen(port, ()=>{
    console.log('Serveur en route');
});