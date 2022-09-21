"use strict";

const { json } = require("express");
const Open = require("../../models/Open");
const output = {
    chat : async (req,res) => {  //오픈 채팅 목록 페이지
        
        const option = req.query.option;
        if(option===undefined){
            const open = new Open();
            const rows = await open.OpenAll();
            res.render("chat/openChat",{rows:rows});
        }
        else if(option==='search'){
            const key = req.query.key;
            console.log(key);
            const open = new Open();
            const rows = await open.selectOpen(key);
            res.render("chat/openChat",{rows:rows});
        }
        
    },
    random : (req,res) => {
        res.render('chat/random');
    },
    open : (req,res) => {
        
        res.render("chat/newOpen");
    }
}

const process = {
    open : async (req,res) => {
        console.log(req.body);
        const open = new Open(req.body);
        const response = await open.Open();
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
}