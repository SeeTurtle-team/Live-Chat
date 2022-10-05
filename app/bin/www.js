const app =require("../app");

const port =process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log('서버 가동');
});

const SocketIO = require('socket.io');


const io = SocketIO(server,{path:'/socket.io'});
var room = new Array();  //생성된 방 목록들

io.on('connection',(socket)=>{
    const session = require('express-session');
    var instanceId = session.userId;
    
    socket.on('disconnect',()=>{
        console.log('클라이언트 접속 해제',socket.id);
        clearInterval(socket.interval);
        
    });
    socket.on('joinRoom',function (data) {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName;
        var userId = data.userId;
        for(i=0; i<room.length;i++){
            if(room[i]===roomName){
                io.sockets.in(roomName).emit('recMsg',{comment: userId + " 님이 입장하였습니다. " +'\n'})
                return;
            }
            
        }
        room.push(roomName);
        console.log(room);
    });

   /* for(i=0; i<room.length;i++){
        socket.on(room[i],function(data){
            console.log(data);
            io.sockets.in(room[i]).emit('reqMsg',{comment: instanceId + " : " + data.comment+'\n'})
        })
    }*/

    socket.on('test',function(data){
        console.log("/-----------테스트 시작--------------//")
        var test = data.roomName;
        console.log('test count');
        for(i=0; i<room.length;i++){
            console.log(room[i]+"  for 문이 돌음")
            if(room[i]===test){
                console.log(room);
                var roomSeq = room[i];
                var userId = data.userId;
                io.sockets.in(roomSeq).emit('recMsg',{comment: userId + " : " + data.comment+'\n'})
                /*
                socket.on(roomSeq,function(data){
                    console.log(data.comment+"sadfasd");
                    console.log(roomSeq)
                    io.sockets.in(roomSeq).emit('recMsg',{comment: instanceId + " : " + data.comment+'\n'})
                    console.log("adfsd");
                    console.log('/---------------test is done------------//');
                    return;
                })*/
               
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