const SocketIO = require('socket.io');
const server = require("../../bin/www");
const OneChat = require("../models/OneChat");
const randomStack = require("../public/js/chat/randomChatList");

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
        
            //random chat 요청
            socket.on('requestRandomChat', function(data) {
                randomStack.addClient(data.userId, socket.id, 1, null);
                for(var i = 0; i<randomStack.clients.length; i++){
                    if(randomStack.clients[i].status == 1 && data.userId != randomStack.clients[i].id){
                        console.log("입장");
                        socket.join(randomStack.clients[i].roomName);
                        randomStack.clients[i].status = 0;
                        for(var j = 0; i<randomStack.clients.length; j++){
                            if(randomStack.clients[j].id == data.userId){
                                randomStack.clients[j].status = 0;
                                var roomName = randomStack.clients[i].roomName;
                                randomStack.clients[j].roomName = roomName;
                                console.log(randomStack.clients);
                                break;
                            }
                        }
                        break;
                    } else{
                        console.log("방 만들기");
                        var roomName = socket.id;
                        randomStack.clients[i].roomName = roomName;
                        socket.join(roomName);
                        console.log(randomStack.clients);
                        break;
                    }
                }
                io.sockets.to(roomName).emit("sendRoomName", {roomName});
            });

            //random chat 나가기
            socket.on('exitRoom', function(data){
                for(var i = 0; i<randomStack.clients.length; i++){
                    if(randomStack.clients[i].id == data.userId){
                        socket.leave(randomStack.clients[i].roomName);
                        randomStack.clients.splice(i, 1);
                        console.log(randomStack.clients);
                        break;
                    }
                }
            });

            //랜덤 채팅 메시지 전송
            socket.on('sendMessage', function(data){
                console.log(data.data);
                const text = data.data;
                io.sockets.to(data.roomName).emit('recMessage', {text});
            });






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


            socket.on('one',function(data){//일대일 채팅
                var test = data.roomName;
                console.log('test count');
                for(var i=0; i<room.length;i++){
                    console.log(room[i]+"  for 문이 돌음")
                    if(room[i]===test){
                        console.log(room);
                        var roomSeq = room[i];
                        var userId = data.userId;
                        socket.broadcast.to(roomSeq).emit('oneMsg',{class:'other',comment: userId + " : " + data.comment+'\n'})//msg 보낸 사람빼고 전부
                    }
                }              
            }) 
            

            //비디오 부분
            
            function log() {
                let array = ['Message from server:'];
                array.push.apply(array,arguments);
                socket.emit('log',array);
            }
        
            socket.on('message',message=>{
                log('Client said : ' ,message);
                socket.broadcast.emit('message',message);
            });
        
            socket.on('create or join',room=>{
                let clientsInRoom = io.sockets.adapter.rooms[room];
                let numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
                log('Room ' + room + ' now has ' + numClients + ' client(s)');
                
                if(numClients === 0){
                    console.log('create room!');
                    socket.join(room);
                    log('Client ID ' + socket.id + ' created room ' + room);
                    socket.emit('created',room,socket.id);
                }
                else if(numClients===1){
                    console.log('join room!');
                    log('Client Id' + socket.id + 'joined room' + room);
                    io.sockets.in(room).emit('join',room);
                    socket.join(room);
                    socket.emit('joined',room,socket.id);
                    io.sockets.in(room).emit('ready');
                }else{
                    socket.emit('full',room);
                }
            });
        

            
        })

       
    }
}

module.exports = Socket;

