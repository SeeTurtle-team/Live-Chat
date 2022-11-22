"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./home.ctrl");

const interceptor = require("../../public/js/interceptor/interceptor");

//router가 서버에서 주고 받고 하는 API 역할인듯 하다
router.get('/', ctrl.output.home); //여기서 html 파일 가져오는 듯

router.get("/login", ctrl.output.login);

router.get("/register", ctrl.output.register);

router.get('/logout', ctrl.process.logout);

router.get('/mypage', interceptor, ctrl.output.mypage);

router.get('/editMypage', interceptor, ctrl.output.editMypage);

//------------------post----------------------//
router.post("/register", ctrl.process.register);

router.post("/login", ctrl.process.login);

router.post("/editMypage", ctrl.process.editMypage);

module.exports=router;