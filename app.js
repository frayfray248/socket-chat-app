// modules
const express = require('express');
const http = require('http');

// objects
const app = express();
const server = http.createServer(app);

// root
app.use('/', (req, res) => {
    res.status(200).send("hello world");
});

// server start
server.listen(3000, console.log('Listening on port 3000'));
