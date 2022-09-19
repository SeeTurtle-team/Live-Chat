"use strict";

const output = {
    chat : (req,res) => {
        res.render("chat/openChat");
    },
    random : (req,res) => {
        res.render('chat/random');
    },
    open : (req,res) => {
        res.render("chat/newOpen");
    }
}

const process = {
   open : (req,res) => {
        console.log(req.body);
   }
}

module.exports = {
    output,
    process,
}