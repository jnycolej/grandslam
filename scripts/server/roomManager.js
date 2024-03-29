const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = {};
let roomCode = 0;

function handleConnection (io, socket) {
    socket.on('create room', () => {
        roomCode = generateRoomCode();
        //Initialize room state and add the player
        console.log(`Room ${roomCode} created`);
    });

    socket.on('join room', (roomCode) => {
        //Logic for joining a room
        console.log(`Player joined room ${roomCode}`);
    });

    //Add more room-related socket event listeners and logic here
}

function generateRoomCode() {
    //Generate and return a room code
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function createRoom() {
    multiplayer = true;
    // Create room logic...
}

function joinRoom() {
    multiplayer = true;
}
module.exports = { handleConnection };
