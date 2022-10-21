"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./board.ctrl");

const interceptor = require("../../public/js/interceptor/interceptor");

router.get('/', interceptor,ctrl.output.board); 

router.get('/newBoard', interceptor,ctrl.output.newBoard);

router.get('/writeG', interceptor,ctrl.output.writeG);

router.get('/content/:seq', interceptor,ctrl.output.content);

// router.get('/list', ctrl.output.table);

router.get('/page/:page', ctrl.output.page);

router.post('/writeP', interceptor,ctrl.process.writeP);

module.exports=router;