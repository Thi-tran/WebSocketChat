const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }    
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    console.log('test');
});

http.listen(6060, () => {
    console.log('listening on *');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('operation-sendMessage', (msg) => {
        console.log('Sending message: ' + msg.message);
        io.emit('operations-recieveMessage', msg);
    });
});
  