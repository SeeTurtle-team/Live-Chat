"use strict"

const db = require("../config/db");

class MyPageStorage{
    static async getInfo(id){
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users where userId =?;";
            db.query(query, [id], (err, data) => {
                if(err) reject('${err}');
                resolve(data[0]);
            });
        });
    };

    static async update(id, nickname, intro){
        return new Promise((resolve, reject) => {
            const query = "UPDATE users set userNickname = ?, intro = ? where userId = ?;";
            db.query(query, [nickname, intro, id], (err, data) => {
                if(err) reject('${err}');
                resolve({success: true});
            });
        });
    };

    static async friends(id){
        return new Promise((resolve, reject) => {
            const query = "SELECT friends from friend where userId=? and flag=1;";
            db.query(query, [id], (err, data) => {
                if(err) reject('${err}');
                resolve(data);
            });
        });
    };

    static async delete(userId, friendId){
        return new Promise((resolve, reject) => {
            const query = "delete from friend where userId=? and friends=?;";
            db.query(query ,[userId, friendId], (err, data) => {
                if(err) reject('${err}');
                resolve({success: true});
            });
        });
    };

    static async getUsers(){
        return new Promise((resolve, reject) => {
            const query = "select * from users;";
            db.query(query, (err, data) => {
                if(err) reject('${err}');
                resolve({data: data});
            });
        });
    };
}

module.exports = MyPageStorage;