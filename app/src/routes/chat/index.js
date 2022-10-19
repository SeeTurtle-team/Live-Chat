"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./chat.ctrl");

const interceptor = require("../../public/js/interceptor/interceptor");

router.get('/', interceptor,ctrl.output.chat); //오픈채팅방 리스트

router.get('/random',interceptor,ctrl.output.random);//랜덤 채팅 페이지 이동

router.get('/newChat',interceptor,ctrl.output.open);//오픈 채팅방 만들기

router.get('/openRoom',interceptor,ctrl.output.openRoom);//오픈 채팅방 들어가기

router.get('/oneChat',interceptor,ctrl.output.oneChat);//일대일 대상 리스트

router.get('/oneSearch',interceptor,ctrl.output.oneSearch);//일대일 검색기능

router.get('/oneMyList',interceptor, ctrl.output.oneMyList);//일대일 채팅방 리스트

router.get('/oneRoom', interceptor,ctrl.output.oneRoom);

//---------------post------------------//
router.post('/newOpen',interceptor,ctrl.process.open);  //오픈채팅 새로운 방 만들기

router.post('/oneStart',interceptor, ctrl.process.oneStart);

module.exports=router;