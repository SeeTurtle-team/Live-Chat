"use strict";

const { promiseImpl } = require("ejs");
const db = require("../config/db");

class boardStorage{
    static async newBoard(userInfo){
        return new promise((resolve, reject)=>{
            const query = "insert into openchat(seq,openName,openCategory,openDetail) values(?,?,?,?);";
            db.query(query, [userInfo.seq, chatInfo.name, chatInfo.category, chatInfo.detail],(err)=>{
                if(err) reject('${err}');
                resolve({success:true});
            });
        })
    }

}





module.exports = boardStorage;