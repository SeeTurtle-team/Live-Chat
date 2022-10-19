"use strict";

function goChat(id){
    console.log("채팅할 대상 : "+ id);

    const req = {
        id : id,
    }
    fetch('/chat/oneStart',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body:JSON.stringify(req)
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            alert(id+'님과 채팅을 시작합니다');
        }else{
            alert(res.msg +"문제가 발생했습니다");
        }
    })
}