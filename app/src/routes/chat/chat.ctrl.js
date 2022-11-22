"use strict";

const { json } = require("express");
const Open = require("../../models/Open");//오픈채팅
const OneChat = require("../../models/OneChat");

const { generateUploadURL } = require("../../config/s3");
const useArr = require("../../public/js/chat/oneChatList");//접속한 유저 저장 리스트
const MyPage = require("../../models/MyPage");

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
    oneChat : (req, res) => {  //접속 유저 리스트
       
        console.log(useArr.useArr);
        var countUser = useArr.useArr.length;
        res.render("chat/oneChatList",{rows:useArr.useArr,count:countUser});
             
    },

    oneSearch : (req,res) => { //접속 유저 찾기
        const text = req.query.text;
        console.log(text);
        const useSearch = useArr.searchUser(text);
        console.log("일대일 채팅 접속자 검색 결과 : " + useSearch)
        var countUser = useSearch.length;
        res.render("chat/oneChatList",{rows:useSearch,count:countUser});
    },

    oneMyList : async (req,res) => {  //내 채팅 방 리스트
        const oneList = new OneChat(req.body);
        var userId = req.session.userId;
        const rows = await oneList.oneList(userId);
        console.log(rows);
        res.render("chat/oneMyList",{rows:rows,userId});
    },

    oneRoom : async (req,res) => {  //채팅방 페이지
        const userId = req.session.userId;
        const other = req.body.id;
        const seq = req.query.seq;
        const one = new OneChat(req.body);
        const response = await one.readOne(seq,userId);
        if(response.success){
            const rows = await one.selectOne(seq);
            console.log(rows);
            res.render("chat/oneRoom",{userId,other,rows:rows,seq});
        }else{
            res.send(`
                <script>
                    alert('로그아웃 되셨습니다');
                    return;
                </script>
            `);
        }
        
    },

    imgurl : async (req,res) => {
        const url = await generateUploadURL();
        res.json({ url })
    },

    //--------------랜덤채팅--------------//
    random : async (req,res) => {
        var userId = req.session.userId;
        const mypage = new MyPage();
        const rows = await mypage.getInfo(userId);
        res.render('chat/random', {userId:userId, rows:rows});
    },

    //--------------화상채팅 고민 중----------//
    video : (req,res) => {
        res.render('video/videoChat');
    }

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
        
        const one = new OneChat(req.body);
        const response = await one.insertOne(userId1,userId2);
        return res.json(response);
    },

    oneInsert : async (req,res) => {
        const one = new OneChat(req.body);
        const userId = req.body.userId; //내 아이디
        const otherId = req.body.otherId; //상대 아이디
        const chat = req.body.chat;
        const seq = (req.body.seq);
        const imgFlag = req.body.imgFlag;
        const response = await one.insertOneChat(userId,otherId,chat,seq,imgFlag);
        console.log("success : "+response.success + ", "+response.seq);
        return res.json(response);
    },

    checkOne : async (req,res) => {
        const userId1 = req.session.userId;
        const userId2 = req.body.id;
        console.log(req.body.id + " 와"+userId1 + " 일대일 채팅 시작");
        const one = new OneChat(req.body);
        const response = await one.checkOne(userId1,userId2);
        return res.json(response);
    },

    imgUpload : async (req,res) => {
        console.log(req.body)
    }
}

module.exports = {
    output,
    process,
}