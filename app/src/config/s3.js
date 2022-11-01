const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)
dotenv.config();
/*
const region = "ap-northeast-2"
const bucketName = "s3-practice-ehdcjf"
const accessKeyId = process.env.accessKeyId
const secretAccessKey = ""*/



const s3 = new aws.S3({
  region : process.env.resion,
  accessKeyId : process.env.accessKeyId,
  secretAccessKey : process.env.secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: "myhsproject",
      Key: imageName,
      Expires: 60
    })
  
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
  }
  
  module.exports = {
    generateUploadURL,
  }