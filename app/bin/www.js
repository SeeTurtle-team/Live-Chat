const app =require("../app");

const port =process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log('서버 가동');
});

const SocketIO = require('socket.io');

const io = SocketIO(server,{path:'/socket.io'});
var room = new Array();

io.on('connection',(socket)=>{
    var instanceId = socket.id;
    
    socket.on('disconnect',()=>{
        console.log('클라이언트 접속 해제',socket.id);
        clearInterval(socket.interval);
        
    });
    socket.on('joinRoom',function (data) {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName;
        
        for(i=0; i<room.length;i++){
            if(room[i]===roomName){
                return;
            }
            
        }
        room.push(roomName);
        console.log(room)
    });

   /* for(i=0; i<room.length;i++){
        socket.on(room[i],function(data){
            console.log(data);
            io.sockets.in(room[i]).emit('reqMsg',{comment: instanceId + " : " + data.comment+'\n'})
        })
    }*/

    socket.on('test',function(data){
        var test = data.roomName;
        for(i=0; i<room.length;i++){
            console.log(room[i]+"2")
            if(room[i]===test){
                var roomSeq = room[i];
                socket.on(roomSeq,function(data){
                    console.log(data.comment+"sadfasd");
                    console.log(roomSeq)
                    io.sockets.in(roomSeq).emit('recMsg',{comment: instanceId + " : " + data.comment+'\n'})
                    console.log("adfsd");
                })
                return;
            }
            
        }
    })

    socket.on('reqMsg', function (data) {
        console.log(data);
        io.sockets.in(roomName).emit('recMsg', {comment: instanceId + " : " + data.comment+'\n'});
    })
    socket.on('error',(error)=>{
        console.error(error);
    });

    //* 클라이언트로부터 메시지 수신
    socket.on('reply', (data) => { // reply라는 이벤트로 송신오면 메세지가 data인수에 담김
         console.log(data);
    });
    
    socket.emit('news','hello monkey');
})