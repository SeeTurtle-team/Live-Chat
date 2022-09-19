"use strict";

const express = require('express');//node_modules에 있는 express 관련 파일 가져옴

const router = express.Router();//express 함수 변환 값 변수에 저장

const ctrl = require("./chat.ctrl");

router.get('/', ctrl.output.chat); 

router.get('/random',ctrl.output.random);

router.get('/newChat',ctrl.output.open);

module.exports=router;