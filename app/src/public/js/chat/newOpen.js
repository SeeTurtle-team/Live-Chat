function newChat(){
    const name = document.getElementById("name").value,
    detail = document.getElementById("detail").value,
    category = document.getElementById("category").value;

    if(!name){
        return alert('채팅방 이름을 입력해주세요');
    }

    if(!detail){
        return alert('채팅방 내용을 입력해주세요');
    }
    console.log(name + " " + detail + " " +category);
    const req = {
        name:name,
        detail:detail,
        category:category
    }

    fetch('/chat/newOpen',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",

        },
        body: JSON.stringify(req)
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            alert('성공');
        } else {
            alert(res.msg);
        }
    })
 
}

function search(){
    const text = document.getElementById('search').value;
    console.log(text);

    location.href="/chat?option=search&key="+text;
}