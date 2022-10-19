"use strict";

const { json } = require("express");
const db = require("../../config/db");
const Open = require("../../models/WriteStorage");

const output = {
    board : async (req, res) => {
        if(req.session.userId){
            res.render("home/index",{login:'로그아웃'});
        }else{
            res.render("home/index",{login:'로그인'});
        }
    },
    newBoard : (req, res) => {
        res.render('board/newBoard');
    },
    writeG :  (req, res) => {
        res.render('board/newBoard');
    },
    // table : (req, res) => {
    //     var sql = "SELECT * FROM socket.write"; 
    //     db.query(sql, function (err, rows, fields) { 
    //         if (err) console.error(err); 
    //         else res.render('board/list.ejs', {rows : rows}); 
    //         console.log(list.writer);
    //     });
    // },
    page : (req, res, next) => {
        var page = req.params.page;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write";
        db.query(sql, function (err, rows, fields) {
            if(err) console.error(err);
            else res.render('board/page.ejs', { rows : rows, page: page, length:rows.length-1, page_num:10});
        })
    },
}

const process = {
    writeP : (req, res) => {
        var body = req.body;
        var sql = 'INSERT INTO socket.write VALUES(?, ?, ?, ?, NOW(), ?)';
        var params = [body.seq, body.writer, body.title, body.content, body.date, body.views];
        db.query(sql, params, function(err) {
            if(err) console.error(err);
            else res.redirect('/board/list');
        })
    },
}

module.exports = {
    output,
    process,
};