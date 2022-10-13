const SocketIO = require('socket.io');
const server = require("../../bin/www");

class Socket{
    constructor(){
        const io = SocketIO(server,{path:'/socket.io'});
        var room = new Array();  //생성된 방 목록들
    }

    startChat(server){
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
                var roomName = data.roomName;
                var userId = data.userId;
                for(var i=0; i<room.length;i++){
                    if(room[i]===roomName){
                        io.sockets.in(roomName).emit('recMsg',{class:'connect',comment: userId + " 님이 입장하였습니다. " +'\n'})
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
                for(var i=0; i<room.length;i++){
                    console.log(room[i]+"  for 문이 돌음")
                    if(room[i]===test){
                        console.log(room);
                        var roomSeq = room[i];
                        var userId = data.userId;
                        socket.broadcast.to(roomSeq).emit('recMsg',{class:'msg',comment: userId + " : " + data.comment+'\n'})//msg 보낸 사람빼고 전부
                        //io.sockets.in(roomSeq).emit('recMsg',{comment: userId + " : " + data.comment+'\n'})//방 전부
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
    }
}

module.exports = Socket;

