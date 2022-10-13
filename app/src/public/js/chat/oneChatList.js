"use strict";

const useArr = new Array();

const deleteUser = (id) =>{
    var num = -1;
    for(var i=0;i<useArr.length;i++){
        if(id===arr[i]){
            num = i;
        }
    }

    if(num>-1){
        useArr.splice(num,i);
    }
}

module.exports = {
    useArr,
    deleteUser,
};