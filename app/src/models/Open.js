"use strict";

const OpenStorage = require("./OpenStorage");

class Open{
    constructor(body){
        this.body = body;
    }

    async Open(){  //채팅 방 만들기
        const chat = this.body;
        console.log(chat);
        try{
            const response = await OpenStorage.newOpen(chat);
            return response;
        }catch(err){
            return{success:false, msg:err};
        }

    }

    async OpenAll(){  //채팅 방 전체 불러오기
        try{
            const response = await OpenStorage.openChatAll();
            return response;
        }catch(err){
            console.log('실패');
        }
    }

    async selectOpen(key){
        try{
            const response = await OpenStorage.selectOpen(key);
            return response;
        }catch(err){
            console.log('실패');
        }
    }
}

module.exports = Open;