// modules
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");

// dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// environment vars
const PORT = process.env.PORT;

// objects
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// root
app.use('/', (req, res) => {
    res.status(200).send(`
    <h1>Hello World<h1>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        var socket = io();
    </script>
    `);
});

// socket handlers
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

// server start
server.listen(PORT, console.log(`Listening on port ${PORT}`));
