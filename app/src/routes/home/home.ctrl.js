"use strict";

const output = {
    home:(req,res) => {
        res.render("home/index");
    },

    login:(req,res) => {
        res.render("home/login");
    }
}

const process ={

}

module.exports = {
    output,
    process,
};