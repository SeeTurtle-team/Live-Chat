"use strict";

const db = require("../config/db");

class OneChatStorage{
    static async oneList(id){
        console.log("id :" +id);
        return new Promise((resolve,reject) => {
            const query = "select * from oneChatList where userId1=? or userId2=?;";
            db.query(query,[id,id],(err,rows) => {
                if(err){reject(err)};
                console.log("storage : "+rows);
                resolve(rows);
            })
        })
    }
}

module.exports = OneChatStorage;