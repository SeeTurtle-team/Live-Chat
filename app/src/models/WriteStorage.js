"use strict";

const db = require("../config/db");

class WriteStorage{

    static getWriteInfo(writer) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM write WHERE writer = ?;";
            db.query(query, [writer], (err, data) => {
                if (err) reject(`${err}`);
                console.log(data);
                resolve(data[0]);
            });
        })
        
    }

    static async openBoardTable(){
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM write;";
            db.query(query,(err, rows)=>{
                if(err){reject(`${err}`)};
                resolve(rows);
            });
        })
    }

    static async save(writeBoard) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO write(seq, writer, title, date, views) VALUES(?, ?, ?, ?, ?)";
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