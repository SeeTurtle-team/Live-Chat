"user strict"

const WriteStorage = require("./WriteStorage");

class Write{
    constructor(body){
        this.body = body;
    }

    async script() {
        try{
            const response = await WriteStorage.openBoardTable();
            return response;
        }catch(err) {
            console.log('실패');
        }

    }





}


module.exports = Write;