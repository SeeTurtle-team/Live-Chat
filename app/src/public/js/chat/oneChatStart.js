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
}