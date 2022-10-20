"use strict";

const db = require("../config/db");

class OneChatStorage{
    static async oneList(id){  //해당 유저의 일대일 채팅방 리스트
        console.log("id :" +id);
        return new Promise((resolve,reject) => {
            const query = "select a.seq, a.userId userId1, b.userId userId2"
                        + " from oneChatList a,oneChatList b "
                        + "where a.userId =? and a.seq=b.seq and a.userId!=b.userId";
            db.query(query,[id],(err,rows) => {
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
            const query = "select * from oneChat where chatSeq=?";
            db.query(query,[seq],(err,rows) => {
                if(err){reject(err)};
                resolve(rows);
            });
        })
    }
}

module.exports = OneChatStorage;