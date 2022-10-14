"use strict";

const useArr = new Array();

const addUser = (id) => {
    for(var i=0;i<useArr.length;i++){
        if(id===useArr[i]){
            return;
        }
    }
    useArr.push(id);
}
const deleteUser = (id) =>{
    var num = -1;
    for(var i=0;i<useArr.length;i++){
        if(id===useArr[i]){
            num = i;
        }
    }

    if(num>-1){
        useArr.splice(num,i);
    }
}

module.exports = {
    useArr,
    addUser,
    deleteUser,
};