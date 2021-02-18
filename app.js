// modules
const express = require('express');
const http = require('http');

// dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// environment vars
const PORT = process.env.PORT;

// objects
const app = express();
const server = http.createServer(app);


// root
app.use('/', (req, res) => {
    res.status(200).send("hello world");
});

// server start
server.listen(PORT, console.log(`Listening on port ${PORT}`));
