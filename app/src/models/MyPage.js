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

    async update(id, nickname, intro){
        try{
            const response = await MyPageStorage.update(id, nickname, intro);
            return response;
        }catch(err){
            console.log("fail");
        }
    }

    async friends(id){
        try{
            const response = await MyPageStorage.friends(id);
            return response;
        }catch(err){
            console.log('fail');
        }
    }

    async delete(userId, friendId){
        try{
            const response = await MyPageStorage.delete(userId, friendId);
            return response;
        }catch(err){
            console.log('fail');
        }
    }

    async getUser(){
        try{
            const response = await MyPageStorage.getUsers();
            return response;
        }catch(err){
            console.log('fail');
        }
    }
}

module.exports = MyPage;