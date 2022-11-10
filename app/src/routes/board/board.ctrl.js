"use strict";

const session = require("express-session");
const { json, response } = require("express");
const db = require("../../config/db");
const Open = require("../../models/WriteStorage");
const { addListener } = require("../../config/db");

const output = {
    board : (req, res) => {
        if(req.session.userId){
            res.render("board/page",{login:'로그아웃'});
        }else{
            res.render("board/page",{login:'로그인'});
        }
    },
    newBoard : (req, res) => {
        res.render('board/newBoard');
    },
    writeG :  (req, res) => {
        res.render('board/newBoard');
    },
    page : (req, res, next) => {
        var page = req.params.page;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write";
        db.query(sql, function (err, rows, fields) {
            if(err) console.error(err);
            else res.render('board/page.ejs', { rows : rows, page: page, length:rows.length-1, page_num:10});
        })
    },
    content : (req, res, next) => {
        var seq = req.params.seq;
        var sql = "SELECT seq, writer, title, content, date, views FROM socket.write WHERE seq=?";
        console.log(seq);
        db.query(`UPDATE socket.write SET views=views+1 WHERE seq='${seq}'`);
        db.query(sql, [seq], (err, row) => {
            if(err) console.error(err);
            else res.render('board/content', {row : row[0]});
        });
        
    },
    listUpdate : (req, res) => {
        res.render('board/listUpdate');
    },
    listUpdateG : (req, res) => {
        var body = req.body;
        var sql = `SELECT * FROM socket.write WHERE seq=?`;
        var params = [body.seq, body.writer, body.title, body.content];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
            else res.render('/listUpdate', {row : row[0]});
        });
    },
    update : (req, res, next) => {
        var seq = req.params.seq;
        var body = req.body;
        var sql = `SELECT * FROM socket.write WHERE seq='${seq}'`;
        var params = [body.seq, body.writer, body.title, body.content, body.date, body.views];
        db.query(sql, params, (err, row) => {
            if(err) console.error(err);
        res.render('board/update', {row : row[0]});
        });
    },
    writer : (req, res) => {
        const id = req.session.userId;
        var sql = `SELECT * FROM socket.comment WHERE id='${id}'`;
        var parmas = [nickName, ctt, dt];
        db.query(sql, params, (err) => {
            if(err) console.error(err);
            res.render('board/update');
        })
    },
    searchWriter: (req, res) => {
        var boardSearch = req.query.writer;
        var sql = `SELECT writer, title, content FROM sockt.writer LIKE`+ db.escape('%'+boardSearch+'%');
        db.query(sql, (err, rows) => {
            if(err) console.error(err);
            else if(rows[0] == undefined) {
                res.render('board/page/update', {'id':req.writer})
            }
            else {
                res.render('board/page',{rows:rows, 'id':req.writer})
            }
        })
    }

    /*컨트롤러에서 파라미터로 받으면 req.query로 받아서 쿼리해서 클라이언트 단으로 넘겨주시면 됩니다
    다만 이건 도전과제인데 현재 검색결과를 표출하는 ejs가 따로 있는거 같더라고요
    일단 검색한 결과를 거기에 띄우는거를 해보시되 search.ejs를 따로 두는게 아니라 page.ejs에서
    검색결과를 띄우는걸 최종 목표로 하고 검색결과를 도전해주세요*/
}

const process = {
    writeP : (req, res) => {
        var body = req.body;
        const id = req.session.userId;
        var writer = req.body.writer;
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        var nowTime = hours + ':' + minutes + ':' + seconds;
        var sql = `INSERT INTO socket.write(writer,title,content,date) VALUES('${id}', ?, ?, ?)`;
        var params = [ body.title, body.content,nowTime];
        db.query(sql, params, (err) => {
            if(err) console.error(err);
            else res.redirect('/board/page/1');
        })
    },
    listUpdateP : (req, res, next) => {
        const id = req.session.userId;

        var seq = req.body.seq;
        var title = req.body.title;
        var content = req.body.content;
        var date = req.body.date;
        var views = req.body.views;
        var body = req.body;
        var writer = req.body.writer;
        var params = [body.title, body.content, body.date];
        var seq = req.body.seq;
        var writer = req.body.writer;
        var sql = `UPDATE socket.write SET seq = '${seq}', writer = '${id}',  title = ?, content = ?, date = NOW() WHERE seq = '${seq}'?`;
        if(id !== writer) {
            res.send("<script>alert('아이디 불일치');history.back();</script>");
        }
        else {
        db.query(sql, params, (err) => {
            if(err) console.error(err);
            else res.redirect('/board/listUpdate');
        })
    }
    },
}

module.exports = {
    output,
    process,
};