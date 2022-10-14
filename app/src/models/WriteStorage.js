"use strict";

const { promiseImpl } = require("ejs");
const db = require("../config/db");

class WriteStorage{

    static getWriteInfo(writer) {
        return new Promise((resolve, reject) => {
            const query = "select * from write where writer = ?;";
            db.query(query, [writer], (err, data) => {
                if (err) reject(`${err}`);
                console.log(data);
                resolve(data[0]);
            });
        })
        
    }

    static async openBoardTable(){
        return new Promise((resolve, reject)=>{
            const query = "select * from write;";
            db.query(query,(err, rows)=>{
                if(err){reject(`${err}`)};
                resolve(rows);
            });
        })
    }

    static async save(writeBoard) {
        return new Promise((resolve, reject) => {
            const query = "insert into write(seq, writer, title, date, views) values(?, ?, ?, ?, ?)";
            db.query(
                query,
                [writeBoard.seq, writeBoard.writer, writeBoard.title, writeBoard.date, writeBoard.views],
                (err) => {
                    if(err) reject(`${err}`);
                    else resolve({success: true});
                }
            );
        });
    }

}





module.exports = WriteStorage;