"use strict";

const db = require("../config/db");

class OpenStorage{

    static async newOpen(chatInfo){
        console.log(chatInfo.detail+"asdfa");
        return new Promise((resolve, reject)=>{
            const query = "insert into openchat(openName,openCategory,openDetail) values(?,?,?);";
            db.query(query,[chatInfo.name,chatInfo.category,chatInfo.detail],(err)=>{
                if(err) reject('${err}');
                resolve({success:true});
            });
        
        });
    }

    static async openChatAll(){
        return new Promise((resolve,reject)=>{
            const query = "select * from openchat;";
            db.query(query,(err,rows)=>{
                if(err){reject('${err}')};
                resolve(rows);
            })
        })
    }
}

module.exports = OpenStorage;