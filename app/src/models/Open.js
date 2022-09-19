"use strict";

const OpenStorage = require("./OpenStorage");

class Open{
    constructor(body){
        this.body = body;
    }

    async Open(){
        const chat = this.body;
        console.log(chat);
        try{
            const response = await OpenStorage.newOpen(chat);
            return response;
        }catch(err){
            return{success:false, msg:err};
        }

    }
}

module.exports = Open;