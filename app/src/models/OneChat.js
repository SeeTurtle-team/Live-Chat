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

    async insertOne(userId1,userId2){
        const maxSeq = await this.maxSeq();
        console.log("nextSeq : "+maxSeq[0].seq);
        const nextSeq = parseInt(maxSeq[0].seq)+1;
        try{
            console.log("insertOne 들어옴")
            const response1 = await OneChatStorage.insertOne(userId1,nextSeq);
            const response2 = await OneChatStorage.insertOne(userId2,nextSeq);
            console.log(response1.success)
            if(response1.success && response2.success){
                console.log("hi");
                return ({success : true});
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
}

module.exports = OneChat;