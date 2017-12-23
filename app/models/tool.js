const bcrypt = require("bcryptjs")
const CryptoJS = require("crypto-js")
const getToken = function (org, username) {
    var str = JSON.stringify({
        org: org,
        username: username
    })
    return 
}

//https://www.npmjs.com/package/bcryptjs
const hashPwdBcrypt = function (password) {
    const SALT_FACTOR = 10        //加盐随机数
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            //TODO...
            //hash is the encrypt password, Store hash in your password DB. 
        });
    });
}//void async
const comparePwdBcrypt = function (password) {
    var hash
    //从库中得到存的密码 hash
    //TODO...
    bcrypt.compare(password, hash).then((res) => {
        if (res === true) {
            return true
        } else {
            return false
        }
    }).catch((err) => {
        console.log(err)
    })
}//bool async


/**
 * encryptPwdAes:用AES加密密码
 * decryptPwdAes：用AES解密密码
 * https://www.npmjs.com/package/crypto-js
 */

//secretKey  秘钥
const encryptPwdAes = function (password, secretKey) {
    var ciphertext = CryptoJS.AES.encrypt(password.toString(), secretKey);
    //store ciphertext
}//void
const decryptPwdAes = function (ciphertext, secretKey) {
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext
}//string

/**
 * encryptObjAes:用AES加密对象
 * decryptObjAes：用AES解密对象
 */
const encryptObjAes = function (obj, secretKey) {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey);
    //store ciphertext
}//void
const decryptObjAes = function (ciphertext, secretKey) {
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}//Object



const existy = function (thing) {

}
module.exports = {
    'getToken': getToken,
    'hashPwdBcrypt': hashPwdBcrypt,
    'comparePwdBcrypt': comparePwdBcrypt,
    'encryptPwdAes': encryptPwdAes,
    'decryptPwdAes': decryptPwdAes,
    'encryptObjAes': encryptObjAes,
    'decryptObjAes': decryptObjAes
}