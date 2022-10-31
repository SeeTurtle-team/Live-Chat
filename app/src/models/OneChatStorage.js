"use strict";

const db = require("../config/db");

class OneChatStorage{
    static async oneList(id){  //해당 유저의 일대일 채팅방 리스트
        console.log("id :" +id);
        return new Promise((resolve,reject) => {
            const query = "select x.seq, x.userId1, x.userId2, y.flag "
                            +"from ("
                            +"select a.seq seq, a.userId userId1, b.userId userId2 "
                            +"from oneChatList a, oneChatList b "
                            +"where a.userId = ? and a.seq=b.seq and a.userId!=b.userId "
                            +"group by seq"
                            +") x left join "
                            +"(select b.userId userId1, COUNT(a.flag) as flag, a.chatSeq chatSeq "
                            +"from oneChat a, oneChatList b "
                            +"where b.userId = ? and a.chatSeq=b.seq and a.flag=1"
                            +") y "
                            +"on x.userId1 = y.userId1 and x.seq=y.chatSeq"
            db.query(query,[id,id],(err,rows) => {
                if(err){reject(err)};
                console.log("storage : "+rows);
                resolve(rows);
            })
        })
    }

    static async insertOne(userId1,nextSeq){
        return new Promise((resolve,reject) => {
            const query = "insert into oneChatList(userId,seq) values(?,?);";
            db.query(query,[userId1,nextSeq],(err)=>{
                if(err) reject(err);
                resolve({success:true});
            })
        })
    }

    static async maxSeq(){  //채팅방 생성시 이전 최대 seq 조회
        return new Promise((resolve,reject) =>{
            const query = "select * from oneChatList order by seq desc limit 1";
            db.query(query,(err,row)=>{
                if(err){reject(err)};
                resolve(row);
            })
        })
    }

    static async checkOne(userId1,userId2){  //채팅방 중복 생성이 되지 않게
        return new Promise((resolve,reject) => {
            const query = "select a.seq, a.userId userId1, b.userId userId2"
                        + " from oneChatList a,oneChatList b "
                        + "where a.userId =? and a.seq=b.seq and a.userId!=b.userId"
                        + " and b.userId = ?";
            db.query(query,[userId1,userId2],(err,row)=>{
                if(err){reject(err)};
                resolve(row);
            })
        })
    }

    static async selectOne(seq){
        return new Promise((resolve,reject) => {
            const query = "select * from oneChat where chatSeq=? order by seq";
            db.query(query,[seq],(err,rows) => {
                if(err){reject(err)};
                resolve(rows);
            });
        })
    }

    static async insertOneChat(userId,chat,seq){
        console.log("tlfgodehlsl");
        return new Promise((resolve,reject) =>{
            const query = "insert oneChat(userId,chat,chatSeq,flag) values (?,?,?,1);";
            db.query(query,[userId,chat,seq],(err) => {
                if(err){reject(err)}
                resolve({success:true,seq:seq});
            })
        })
    }

    static async readOne(seq,userId){
        return new Promise((resolve,reject)=>{
            const query = "update oneChat set flag=0 where chatSeq=? and userId!=?;";
            db.query(query,[seq,userId],(err) => {
                if(err){reject(err)}
                resolve({success:true});
            })
        })
    }
}

module.exports = OneChatStorage;