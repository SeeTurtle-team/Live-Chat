"use strict";

const User = require("../../models/User");

const output = {
    home:(req,res) => {
        if(req.session.userId){
            res.render("home/index",{login:'로그아웃'});
        }else{
            res.render("home/index",{login:'로그인'});
        }
        
    },

    login:(req,res) => {
        if(req.session.userId){
            console.log("logout");
            return res.redirect('/logout')
        }else{
            res.render("home/login");
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
        console.log(req.body.id);
        console.log(req.body.pw);
        const response = await user.login();
        if(response.success){
            req.session.userId = req.body.id;
            
        }
        return res.json(response);
    },

    logout : (req, res) => {
        req.session.destroy(()=>{
            req.session
        });
        
        res.send(`
            <script>
                alert('로그아웃 되셨습니다');
                location.href='/';
            </script>
        `)
    }
}

module.exports = {
    output,
    process,
};