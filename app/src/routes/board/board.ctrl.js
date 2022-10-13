"use strict";

const { json } = require("express");
const Open = require("../../models/boardStorage");

const output = {
    board : async (req, res) => {
        if(req.session.userId){
            res.render("board/board",{login:'로그아웃'});
        }else{
            res.render("board/board",{login:'로그인'});
        }
    }
}



const process ={
    open : async (req,res) => {
        console.log(req.body);
        const open = new Open(req.body);
        const response = await open.Open();
        return res.json(response);
    }
}

const boardList = {
    list : (req, res, next) => {
        res.redirect('/board/board/1');
    }
}

const boardTable = {
    table :  (req, res, next) => {
        var page = req.params.page; 
        var mysql = require('../../config/db');
        var con = mysql.createConnection();
        var sql = "select seq, openName, openCategory, openDetail from openchat"; 
        con.query(sql, function (err, rows) { 
            if (err) console.error(err); 
            res.render('board', rows = sql); 
        });
    }
};

const boardRedirect = {
    redirect : (req, res, next) => {
        res.redirect('/board/board/1');
    }
}

module.exports = {
    output,
    process,
    boardList,
    boardTable,
    boardRedirect,
};