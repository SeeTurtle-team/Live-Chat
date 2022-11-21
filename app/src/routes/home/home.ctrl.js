"use strict";

const session = require("express-session");
const User = require("../../models/User");
const useArr = require("../../public/js/chat/oneChatList");
const MyPage = require("../../models/MyPage");

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
    },

    mypage:async (req,res) => {
        var userId = req.session.userId;
        const mypage = new MyPage();
        const rows = await mypage.getInfo(userId);
        res.render("home/mypage", {userId:userId, rows:rows});
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
            useArr.addUser(req.body.id);
            session.userId = req.body.id;
        }
        console.log(session.userId);
        return res.json(response);
    },

    logout : (req , res) => {
        
        req.session.destroy(()=>{
            useArr.deleteUser(session.userId);
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