"use strict";

const { json } = require("express");
const Open = require("../../models/Open");
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