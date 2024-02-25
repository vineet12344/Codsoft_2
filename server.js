const { disconnect } = require('process');

const io = require('socket.io')({
    cors: {
        origin: '*',
    }
});

const users = {};

io.listen(3000);

io.on('connect', socket => {
    console.log("New User connected");
    socket.on('new-user',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name)
    })
    // Listen for 'send-chat-message' event from the client
    socket.on('send-chat-message', message => {
        console.log(message);
        socket.broadcast.emit("chat-message",{message: message,name: users[socket.id]});
    });

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    })
});
