const PORT = process.env.PORT || 3000;

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile (__dirname + '/public/index.html' );
});

io.on('connection', (socket) => {
    let playerName
    let playerGameCode
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    console.log(socket.id);

    socket.on('formRegister', (register)=>{
        console.log('Name of the gamer : ' + register.inputName + '\nPartie join : ' + register.inputChatCode)
        socket.join(register.inputChatCode);
        io.to(register.inputChatCode).emit('registerlog', { NamePlayer : register.inputName, ChatCode: register.inputChatCode });
        playerGameCode = register.inputChatCode
        playerName = register.inputName
    });

    socket.on('chat message', (e) => {
        io.to(e.codeGame).emit('chat message', { message : e.msg, namePlayer: playerName, ChatCode: playerGameCode, id: socket.id });
    });

  });

http.listen(PORT, () => {
  console.log('Listening on ${PORT}');
});