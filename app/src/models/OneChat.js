"use strict";

const OneChatStorage = require("./OneChatStorage");

class OneChat{
    constructor(body){
        this.body = body;
    }

    async oneList(id){
        try{
            const rows = await OneChatStorage.oneList(id);
            return rows;
        }catch(err){
            console.log(err);
            return {success : false, msg : err};
        }
    }

    async checkOne(userId1,userId2){
        const check = await OneChatStorage.checkOne(userId1,userId2);
        console.log(check.length);
        if(check.length!==0){
            return ({success:false,msg : "이미 존재하는 채팅방입니다"});
        }
        if(userId1===userId2){
            return ({success:false,msg : "본인과는 채팅을 할 수 없습니다"});
        }
        console.log(check);
        return {success:true};
    }

    async insertOne(userId1,userId2){
        const maxSeq = await this.maxSeq();
        const nextSeq = parseInt(maxSeq[0].seq)+1;
        try{
            console.log("insertOne 들어옴")
            const response1 = await OneChatStorage.insertOne(userId1,nextSeq);
            const response2 = await OneChatStorage.insertOne(userId2,nextSeq);
            console.log(response1.success)
            if(response1.success && response2.success){
                console.log("hi");
                return ({success : true,seq:nextSeq});
            }else{
                return ({success : false, msg : "채팅방 만들기 실패"})
            }

            
        }catch(err){
            console.log(err);
            return {success : false, msg : err};
        }
                       
    }

    async maxSeq(){
        try{
            const nextSeq = await OneChatStorage.maxSeq();
            return nextSeq;
        }catch(err){
            console.log(err);
            return {success : false, msg : err};
        }
    }

    async selectOne(seq){
        try{
            const rows = await OneChatStorage.selectOne(seq);
            return rows
        }catch(err){
            return {success : false, msg : err};
        }
    }

    async insertOneChat(userId,otherId,chat,seq,imgFlag){
        if(seq==''){  //처음 생성된 방일시
            console.log("seq is null");
            const check = await this.checkOne(userId,otherId);  //있는 방인지 아닌지 체크
            console.log("check : "+ check.success);
            if(check.success){
                const res = await this.insertOne(userId,otherId);  //방 새로 만들기
                if(!res.success){
                    return res;
                }else{
                    console.log(res.seq);
                    seq=res.seq;//새로 만들 방인 경우 다음 seq 값 받아오기
                }
            }
            
        }
        
        try{
            seq = parseInt(seq);
            const response = await OneChatStorage.insertOneChat(userId,chat,seq,imgFlag); //채팅 넣기
            return response;
        }catch(err){
            return {success : false, msg : err};
        }
    }

    async readOne(seq,userId){
        try{
            const response = await OneChatStorage.readOne(seq,userId)
            return response;
        }catch(err){
            return {success : false, msg:err};
        }
    }

    
}

module.exports = OneChat;