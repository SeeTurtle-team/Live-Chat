"use strict";

const db = require("../config/db");

class OneChatStorage{
    static async oneList(id){
        console.log("id :" +id);
        return new Promise((resolve,reject) => {
            const query = "select a.seq, a.userId userId1, b.userId userId2"
                        + " from oneChatList a,oneChatList b "
                        + "where a.userId =? and a.seq=b.seq and a.userId!=b.userId";
            db.query(query,[id],(err,rows) => {
                if(err){reject(err)};
                console.log("storage : "+rows);
                resolve(rows);
            })
        })
    }
}

module.exports = OneChatStorage;