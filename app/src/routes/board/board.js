var express = require('express');
var router = express.Router();
var mysql_odbc = require('../../config/db')();
var conn = mysql_odbc.init();

router.get('/board', function(req, res, next) {
    res.redirect('/board/board/1');
});

router.get('/board/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "select seq, openName, openCategory, openDetail from openchat";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('board', {title: ' 게시판 리스트', rows: rows});
    });
});
module.exports = router;

