"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./board.ctrl");

router.get('/', ctrl.output.board); 

router.get('/board', ctrl.output.list);

router.get('/board/:list', ctrl.output.table);

router.get('/list', ctrl.output.redirect);

module.exports=router;