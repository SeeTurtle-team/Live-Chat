"use strict";

const { json } = require("express");
const Open = require("../../models/Open");//오픈채팅
const OneChat = require("../../models/OneChat");

const useArr = require("../../public/js/chat/oneChatList");//접속한 유저 저장 리스트

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
            res.render("chat/oneChatList",{rows:useArr.useArr,count:countUser});
        }
        
    },

    oneSearch : (req,res) => {
        const text = req.query.text;
        console.log(text);
        const useSearch = useArr.searchUser(text);
        console.log("일대일 채팅 접속자 검색 결과 : " + useSearch)
        var countUser = useSearch.length;
        res.render("chat/oneChatList",{rows:useSearch,count:countUser});
    },

    oneMyList : async (req,res) => {
        const oneList = new OneChat(req.body);
        var userId = req.session.userId;
        const rows = await oneList.oneList(userId);
        console.log(rows);
        res.render("chat/oneMyList",{rows:rows,userId});
    },

    //--------------랜덤채팅--------------//
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
}

const process = {
    open : async (req,res) => {
        console.log(req.body);
        const open = new Open(req.body);
        const response = await open.Open();
        return res.json(response);
    },

    oneStart : (req,res) => {
        console.log(req.body);
    }
}

module.exports = {
    output,
    process,
}