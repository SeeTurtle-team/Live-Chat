"use strict";

const { promiseImpl } = require("ejs");
const db = require("../config/db");

class boardStorage{
    static async newBoard(){
        return new promise((resolve, reject)=>{
            const query = "select * from openchat;";
            db.query(query, [key], (err, rows)=>{
                if(err){reject('${err}')};
                resolve(rows);
            });
        })
    }

}





module.exports = boardStorage;