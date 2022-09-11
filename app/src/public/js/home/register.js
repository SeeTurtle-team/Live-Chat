"use strict";

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    pw =document.querySelector("#passWord"),
    nickName = document.querySelector("#nickname"),
    pwConfirm =document.querySelector("#confirm-passWord"),
    registerBtn = document.querySelector("#button");
    
registerBtn.addEventListener("click",register);


function register(){
    if(!id.value) return alert("아이디를 입력하지 않았습니다");
    if(pw.value !== pwConfirm.value){
        return alert("비밀번호가 일치하지 않습니다");
    }
    const req = {
        id : id.value,
        pw : pw.value,
        name : name.value,
        nickName : nickName.value,
        
    };

   
    
    console.log(req);
    console.log(JSON.stringify(req));

    fetch("/register", {
        method:"POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success){
            location.href='/login';
        } else {
            alert(res.msg);
        }
        
    })
    .catch((err)=> {
        console.log(new Error("회원가입 중 에러발생"));
    });
 }