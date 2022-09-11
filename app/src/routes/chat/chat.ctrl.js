"use strict";

const output = {
    chat : (req,res) => {
        res.send("하이루");
    },
    random : (req,res) => {
        res.render('chat/random');
    }
}

const process = {

}

module.exports = {
    output,
    process,
}