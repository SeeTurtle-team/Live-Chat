"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./chat.ctrl");

router.get('/', ctrl.output.chat); //오픈채팅방 리스트

router.get('/random',ctrl.output.random);//랜덤 채팅 페이지 이동

router.get('/newChat',ctrl.output.open);//오픈 채팅방 만들기

router.get('/openRoom',ctrl.output.openRoom);//오픈 채팅방 들어가기

router.get('/oneChat',ctrl.output.oneChat);//일대일 리스트

router.get('/oneSearch',ctrl.output.oneSearch);//일대일 검색기능

//---------------post------------------//
router.post('/newOpen',ctrl.process.open);  //오픈채팅 새로운 방 만들기

module.exports=router;