var express = require('express');
var router = express.Router();
var mysql_odbc = require('../../config/db')();
var conn = mysql_odbc.init();


//라우팅과 컨트롤러는 분리해야 개발할 땐 귀찮아도 나중에 유지보수하기 편합니다
//현재 routes/board 폴더 안에 있는 index.js가 라우팅해주는 부분이고
//board.ctrl.js가 컨트롤러라고 생각하시면 됩니다
//쿼리랑 비즈니스 코드는 그때 말씀드린대로 model 부분에서 처리해주시면 됩니다!
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

