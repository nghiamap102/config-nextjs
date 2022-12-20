var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});


socketIo.on("connection", (socket) => { 
    console.log("New client connected" + socket.id);

    socket.on('SEND_MESSAGE', function (data) { 
        socketIo.emit('SEND_MESSAGE', { data });
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected"); 
    });
});

server.listen(3031, () => {
    console.log("chat connected");
});