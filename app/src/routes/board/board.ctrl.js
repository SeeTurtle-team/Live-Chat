"use strict";

const { json } = require("express");
const db = require("../../config/db");
const Open = require("../../models/WriteStorage");

const output = {
    board : async (req, res) => {
        if(req.session.userId){
            res.render("board/list",{login:'로그아웃'});
        }else{
            res.render("board/list",{login:'로그인'});
        }
    },
    list : (req, res, next) => {
        res.redirect('/board/list');
    },
    table :  (req, res) => {
        // var page = req.params.page; 
        // var mysql = require('../../config/db');
        // var con = mysql.createConnection();
        // var sql = "SELECT * FROM socket.write"; 
        // con.query(sql, function (err, rows, fields) { 
        //     if (err) console.error(err); 
        //     else res.render('board/list.ejs', {list : rows}); 
        // });
    },
    redirect : (req, res) => {
        var sql = "SELECT * FROM socket.write"; 
        db.query(sql, function (err, rows, fields) { 
            if (err) console.error(err); 
            else res.render('board/list.ejs', {list : rows}); 
        });
    }

}

module.exports = {
    output,
};