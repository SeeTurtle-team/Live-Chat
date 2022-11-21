"use strict"

const MyPageStorage = require("./MyPageStorage");

class MyPage{
    async getInfo(id){
        try{
            const response = await MyPageStorage.getInfo(id);
            return response;
        }catch(err){
            console.log("fail");
        }
    }
}

module.exports = MyPage;