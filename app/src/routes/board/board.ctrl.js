"use strict";

const output = {
    board : (req, res) => {
        if(req.session.userId){
            res.render("board/board",{login:'로그아웃'});
        }else{
            res.render("board/board",{login:'로그인'});
        }
        
    }
}

const process ={

}

module.exports = {
    output,
    process,
}