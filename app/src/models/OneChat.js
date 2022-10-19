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
        }
    }
}

module.exports = OneChat;