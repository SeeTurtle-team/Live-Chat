"use strict";

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

module.exports = {
    output,
    process,
}