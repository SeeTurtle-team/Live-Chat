"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./board.ctrl");

const mysql = require("mysql");

const con = router.get('/../../config/db');

router.get('/', ctrl.output.board); 

router.get('/board', ctrl.boardList.list);

router.get('/board/:page', ctrl.boardTable.table);

router.post('/newBoard', ctrl.process.open);

module.exports=router;