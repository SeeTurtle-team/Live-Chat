"use strict";

const { json } = require("express");
const Open = require("../../models/boardStorage");

const output = {
    board : (req, res) => {
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
    table : (req, res) => {
        connection.query('SELECT * from openchat', (error, rows) => {
          if (error) throw error;
          console.log('openchat info is: ', rows);
          res.send(rows);
        });
      }
};


module.exports = {
    output,
    process,
    boardList,
    boardTable,
}