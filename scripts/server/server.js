const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const gameManager = require('./gameManager');
const roomManager = require('./roomManager');

const app = express();
const server = http.createServer(app);


const io = socketIO(server);


let rooms = {};

//Serve static files from 'assets' and 'scripts' dirctories
app.use('/assets', express.static(path.join(__dirname, '../../assets')));
app.use('/scripts', express.static(path.join(__dirname, '../../scripts')))
app.use('/data', express.static(path.join(__dirname, '../../data')));

//Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

io.on('connection', (socket) => {
    console.log('A client connected');

    roomManager.handleConnection(io, socket);
    gameManager.initializeGame(io, socket);

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
