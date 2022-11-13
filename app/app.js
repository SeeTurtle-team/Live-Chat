"use strict";
/*
할거
퍼블리싱 및 프론트 작업
모델 부분 모듈화
서버리스 배포
화상채팅 할지 말지
마이페이지
채팅 중 이미지 전송
랜덤채팅, 게시판 마무리
읽지 않은 거 채팅 리스트 페이지에서 뜨기
*/

/*Error: read ECONNRESET
    at TCP.onStreamRead (node:internal/stream_base_commons:217:20)
    혹시 작업 중 이런 에러 나면 말씀해주세요*/
//모듈
const express = require('express');

const app = express();
const bodyParser= require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const session = require('express-session');


// 라우팅
const home = require("./src/routes/home"); 
const chat = require("./src/routes/chat");
const board = require("./src/routes/board");

app.set("views","./src/views");
app.set("view engine","ejs");

app.use(express.static(__dirname+'/src/public'));
app.use(express.json());
//url을 통해 전달되는 테이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({extended : true}));

const sessionObj = {
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
};
  
app.use(session(sessionObj));
app.use(cors());
app.use("/",home);
app.use("/chat",chat);
app.use("/board",board);


module.exports = app;