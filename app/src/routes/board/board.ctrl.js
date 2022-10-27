"use strict";

const session = require("express-session");
const { json, response } = require("express");
const db = require("../../config/db");
const Open = require("../../models/WriteStorage");

const output = {
    board : (req, res) => {
        if(req.session.userId){
            res.render("board/page",{login:'로그아웃'});
        }else{
            res.render("board/page",{login:'로그인'});
        }
    },
    newBoard : (req, res) => {
        res.render('board/newBoard');
    },
    writeG :  (req, res) => {
        res.render('board/newBoard');
    },
    page : (req, res, next) => {
        var page = req.params.page;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write";
        db.query(sql, function (err, rows, fields) {
            if(err) console.error(err);
            else res.render('board/page.ejs', { rows : rows, page: page, length:rows.length-1, page_num:10});
        })
    },
    content : (req, res, next) => {
        var seq = req.params.seq;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write WHERE seq=?";
        db.query(`UPDATE socket.write SET views=views+1 WHERE seq='${seq}'`);
        db.query(sql, [seq], (err, row) => {
            if(err) console.error(err);
            else res.render('board/content', {row : row[0]});
        });
        
    },
    listUpdateG : (req, res, row) => {
        // var body = req.body;
        // var seq = req.params.seq;
        // var params = [body.seq, body.writer, body.title, body.content];
        // var sql = "SELECT seq, writer, title, content, date, views FROM socket.write WHERE seq=?";
        // var params = [body.seq, body.writer, body.title, body.content];
        // db.query(`UPDATE socket.write SET title=${body.title}, content=${body.content}, date=NOW() WHERE seq=${body.seq}`);
        // db.query(`UPDATE socket.write SET title=yo, content=ungwoo, date=NOW() WHERE writer=${seq}`);
        // db.query(sql, params, (err, row) => {
        //     if(err) console.error(err);
        //     else res.render('board/listUpdate', {row : row[0]});
        // });

        var seq = req.params.seq;
        var query = `SELECT * FROM socket.write WHERE seq = "${seq}"`;
        db.query(query, (err, row) => {
            if(err) console.error(err);
            else res.render('board/content', {row : row[0]})
        })
    },

}

const process = {
    writeP : (req, res) => {
        var body = req.body;
        const id = req.session.userId;
        var sql = `INSERT INTO socket.write VALUES(?, '${id}', ?, ?, NOW(), 0)`;
        var params = [body.writer, body.title, body.content];
        db.query(sql, params, function(err) {
            if(err) console.error(err);
            else res.redirect('/board/page/1');
        })
    },
    listUpdateP : (req, res) => {
        // var body = req.body;
        // var params = [body.seq, body.writer, body.title, body.content];
        // var sql =`UPDATE socket.write SET title=${body.title}, content=${body.content}, date=NOW() WHERE seq=${id}`;
        // console.log(body.seq);
        // var sql = `UPDATE socket.write SET title=yo, content=ungwoo, date=NOW() WHERE seq=1`;
        // db.query(`UPDATE socket.write SET title=yo, content=ungwoo, date=NOW() WHERE seq=1`);
        // db.query(sql, params, function(err) {
            // if(err) console.error(err);
            // else res.redirect('/board/page/1');
        // })

        // var body = req.body;
        // const id = req.session.userId;
        // var sql = `INSERT INTO socket.write VALUES(?, '${id}', ?, ?, NOW(), 0)`;
        // var params = [body.writer, body.title, body.content];
        // db.query(sql, params, function(err) {
        //     if(err) console.error(err);
        //     else res.redirect('/board/page/1');
        // })

        var seq = req.params.seq;
        var writer = req.body.writer;
        var title = req.body.title;
        var content = req.body.content;
        var date = req.body.date;
        var views = req.body.views;

        var query = `UPDATE socket.write SET writer = "${writer}", title = "${title}", content = "${content}", date = "${date}", views = "${views}" WHERE seq = "${seq}",`;
        db.query(query, (err, data) => {
            if(error) {
                throw err;
            }
            else{
                res.redirect('board/listUpdate');
            }
        })
    }
}

module.exports = {
    output,
    process,
};