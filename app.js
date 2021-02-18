// modules
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const path = require('path');

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

// serve static public folder
app.use(express.static(path.join(__dirname, "public")));

// root
app.get('/', (req, res) => {
    res.render("index");
})

// state
var users = new Map();
var messages = []

// socket handlers
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // username entered
    socket.on('username entered', (data) => {
        users.set(socket.id, data);
        console.log(`client ${socket.id} registered username:`, data);
        socket.emit('update messages', messages);
    })

    // message entered
    socket.on('message entered', (data) => {
        console.log(`${users.get(socket.id)} entered: `, data);
        messages.push({ username: users.get(socket.id), message: data})
    });

    // disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

// server start
server.listen(PORT, console.log(`Listening on port ${PORT}`));
