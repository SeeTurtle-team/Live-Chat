const app =require("../app");

const port =process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log('서버 가동');
});

const SocketIO = require('socket.io');

const io = SocketIO(server,{path:'/socket.io'});

io.on('connection',(socket)=>{
    socket.on('disconnect',()=>{
        console.log('클라이언트 접속 해제',socket.id);
        clearInterval(socket.interval);
        
    });

    socket.on('error',(error)=>{
        console.error(error);
    });

    //* 클라이언트로부터 메시지 수신
    socket.on('reply', (data) => { // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
         console.log(data);
    });
    
    socket.emit('news','hello monkey');
})