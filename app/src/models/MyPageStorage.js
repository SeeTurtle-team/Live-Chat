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
}

module.exports = MyPageStorage;