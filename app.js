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

// socket handlers
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

// server start
server.listen(PORT, console.log(`Listening on port ${PORT}`));
