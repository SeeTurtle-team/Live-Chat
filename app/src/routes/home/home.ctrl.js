"use strict";

const User = require("../../models/User");

const output = {
    home:(req,res) => {
        res.render("home/index");
    },

    login:(req,res) => {
        if(req.session.userId===null){
           res.render("home/login");
        }else{
            res.send(`
                <script>
                    alert('이미 로그인 하셨습니다');
                    location.href='/'; 
                </script>`
                );
            
        }
       
    },

    register:(req,res) => {
        res.render("home/register");
    }
}

const process ={
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },

    login : async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.success){
            req.session.userId = req.body.id;
            
        }
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
};