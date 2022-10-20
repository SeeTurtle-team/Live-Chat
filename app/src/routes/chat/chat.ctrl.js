"use strict";

const { json } = require("express");
const Open = require("../../models/Open");//오픈채팅
const OneChat = require("../../models/OneChat");

const useArr = require("../../public/js/chat/oneChatList");//접속한 유저 저장 리스트

const output = {
    chat : async (req,res) => {  //오픈 채팅 목록 페이지
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
       
        console.log(useArr.useArr);
        var countUser = useArr.useArr.length;
        res.render("chat/oneChatList",{rows:useArr.useArr,count:countUser});
             
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
    oneRoom : async (req,res) => {
        const userId = req.session.userId;
        const other = req.body.id;
        const seq = req.query.seq;
        const one = new OneChat(req.body);
        const rows = await one.selectOne(seq);
        console.log(rows);
        res.render("chat/oneRoom",{userId,other,rows:rows,seq});
    },

    //--------------랜덤채팅--------------//
    random : (req,res) => {
        var userId = req.session.userId;
        res.render('/chat/random', {userId});
    },

}    

const process = {
    open : async (req,res) => {  //오픈 채팅 방 만들기
        console.log(req.body);
        const open = new Open(req.body);
        const response = await open.Open();
        return res.json(response);
    },

    oneStart : async (req,res) => {   //일대일 채팅 방 만들기
        const userId1 = req.session.userId;
        const userId2 = req.body.id;
        console.log(req.body.id + " 와"+userId1 + " 일대일 채팅 시작");
        const one = new OneChat(req.body);
        const response = await one.insertOne(userId1,userId2);
        return res.json(response);
    },

    oneInsert : async (req,res) => {
        const one = new OneChat(req.body);
        const userId = req.body.userId;
        const chat = req.body.chat;
        const seq = parseInt(req.body.seq);
        const response = await one.insertOneChat(userId,chat,seq);
        console.log("success : "+response.success);
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
}