"use strict"

const nickname = document.querySelector('#nickname');
const intro = document.querySelector('#intro');

function edit(){
    const req = {
        nickname: nickname.value,
        intro: intro.value,
    };

    console.log(req);
    console.log(JSON.stringify(req));

    fetch("/editMypage", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            location.href='/mypage';
        } else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.log(new Error("수정 중 에러 발생"));
    });
}

function getProfile(id){
    const req = {id: id};
    location.href="/friendPage?id="+req.id;
}

function del(){
    const friendId = document.getElementById('friendId').innerText;

    const req = {
        friendId: friendId
    };
    console.log(JSON.stringify(req));

    fetch("/friendPage", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            alert("삭제되었습니다.");
            location.href='/mypage';
        } else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.log(new Error("수정 중 에러 발생"));
    });
}

function findUser(){
    location.href = "/findUser";
}