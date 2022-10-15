"use strict";

const { json } = require("express");
const Open = require("../../models/Open");
const useArr = require("../../public/js/chat/oneChatList");
const output = {
    chat : async (req,res) => {  //오픈 채팅 목록 페이지
        if(!req.session.userId){
            res.send(`
                <script>
                    alert("로그인 페이지로 이동합니다");
                    location.href="/login";
                </script>            
            `);
        }
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
        if(!req.session.userId){
            res.send(`
                <script>
                    alert("로그인 페이지로 이동합니다");
                    location.href="/login";
                </script>            
            `);
        }else{
            res.render('chat/random');
        }
        
    },
    open : (req,res) => {
        
        res.render("chat/newOpen");
    },

    openRoom : (req,res) => {
        console.log(req.query.seq);
        var data = req.query.seq;
        var userId = req.session.userId;
        res.render("chat/openRoom",{userId});
    },
    //----------------일대일 채팅-----------------//
    oneChat : (req, res) => {
        if(!req.session.userId){
            res.send(`
                <script>
                    alert("로그인 페이지로 이동합니다");
                    location.href="/login";
                </script>            
            `);
        }else{
            console.log(useArr.useArr);
            var countUser = useArr.useArr.length;
            res.render("chat/oneChat",{rows:useArr.useArr,count:countUser});
        }
        
    },

    oneSearch : (req,res) => {
        const text = req.query.text;
        console.log(text);
        const useSearch = useArr.searchUser(text);
        console.log("일대일 채팅 접속자 검색 결과 : " + useSearch)
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