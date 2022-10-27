"use strict";

function goChat(id,seq){
    console.log("채팅할 대상 : "+ id);
    
    const req = {
        id : id,
    }
    fetch('/chat/checkOne',{
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
            location.href = '/chat/oneRoom?id='+id;
        }else{
            alert(res.msg);
        }
    })
}

function oneChatStart(id, seq){
    console.log(seq);
    const name = seq + "one"
    location.href="/chat/oneRoom?id="+id+"&seq="+seq+"&name="+name;
}