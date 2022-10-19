"use strict";

const interceptor = (req, res, next) => {
    if(!req.session.userId){
        res.send(`
            <script>
                alert("로그인 페이지로 이동합니다");
                location.href="/login";
            </script>            
        `);
        return;
    }else{
        next();
    }
}

module.exports = interceptor;