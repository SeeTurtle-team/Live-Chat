"use strict";

const { promiseImpl } = require("ejs");
const db = require("../config/db");

class boardStorage{
    static async newBoardTable(){
        return new Promise((resolve, reject)=>{
            const query = "select * from openchat;";
            db.query(query,(err, rows)=>{
                if(err){reject('${err}')};
                resolve(rows);
            });
        })
    }

    static async save(writeBoard) {
        return new Promise((resolve, reject) => {
            const query = "insert into openchat(seq, openName, openCategory, openDetail) values(?, ?, ?, ?)";
            db.query(
                query,
                [writeBoard.seq, writeBoard.openName, writeBoard.openCategory, writeBoard.openDetail],
                (err) => {
                    if(err) reject(`${err}`);
                    else resolve({success: true});
                }
            );
        });
    }

}





module.exports = boardStorage;