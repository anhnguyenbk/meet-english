const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./routes/routes')(app);

const UserService = require("./services/UserService");

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        console.log(username + " join the chat room");
        // io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
        UserService.register(username);
    });

    socket.on('disconnect', function() {
        // io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
        console.log( socket.username + " disconnect");
        UserService.remove(socket.username);
    });

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});