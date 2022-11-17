"use strict";

const db = require("../config/db");

class WriteStorage{

    static getWriteInfo(writer) {
        const id = req.session.userId;
        var sql = `SELECT * FROM socket.comment WHERE id='${id}'`;
        var params = [nickName, ctt, dt];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
        })
    }

    static dataUpdate(seq) {
        var seq = req.params.seq;
        var body = req.body;
        var sql = `SELECT * FROM socket.write WHERE seq='${seq}'`;
        var params = [body.seq, body.writer, body.title, body.content, body.date, body.views];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
            else res.render('board/update', {row : row[0]});
            });
    }
    

    static getWritePost() {
        return new Promise((resolve,reject)=>{
        var sql = `UPDATE socket.write SET seq = '${seq}', writer = '${id}',  title = ?, content = ?, date = NOW() WHERE seq = '${seq}'?`;
        if(id !== writer) {
            res.send("<script>alert('아이디 불일치');history.back();</script>");
        }
        else {
        db.query(sql, params, (err) => {
            if(err) {reject(err)};
            resolve({success:true});
            })
        }
        });
    }
}





module.exports = WriteStorage;