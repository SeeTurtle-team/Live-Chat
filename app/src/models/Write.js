"user strict"

const WriteStorage = require("./WriteStorage");

class Write{
    constructor(body) {
        this.body = body;
    }

    async getId(id) {
        try {
            const rows = await WriteStorage.getWriteInfo(id);
            return rows;
        } catch(err) {
            console.log(err);
            return{success : false, msg : err};
        }
    }

    async newUpdate(seq) {
        try {
        const row = await WriteStorage.dataUpdate();
        return row;
        } catch(err) {
            console.log(err);
            return{success : false, msg : err};
        }
    }

    async writePost() {
        try {
            const response = await WriteStorage.getWritePost(seq,userId);
            return response;
        }catch(err){
            return {success : false, msg:err};
        }
    }

}


module.exports = Write;