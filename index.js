const PORT = process.env.PORT || 3000;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile (__dirname + '/public/index.html' );
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
  });

http.listen(PORT, () => {
  console.log('Listening on ${PORT}');
});