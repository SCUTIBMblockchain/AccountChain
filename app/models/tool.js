const bcrypt = require("bcryptjs")
const CryptoJS = require("crypto-js")
const getToken = function (org, username) {
    // var obj = JSON.stringify({
    //     org: org,
    //     username: username
    // })
    return org + '&' + username
}

var hash = function(string) {
    return bcrypt.hashSync(string, 8)
}
var compare = function(string, hash) {
    return bcrypt.compareSync(string, hash);
}
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
var secretKey = 'rgnb'
const encryptObjAes = function (obj) {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey);
    //store ciphertext
    return ciphertext.toString()
}//void
const decryptObjAes = function (string) {
    // var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // return decryptedData
    var re = /(\w+)&(\w+)/
    var group = string.match(re)
    return {
        org: group[1],
        username: group[2]
    }
}//Object



const existy = function (thing) {

}
module.exports = {
    'getToken': getToken,
    'hashPwdBcrypt': hash,
    'comparePwdBcrypt': compare,
    'encryptPwdAes': encryptPwdAes,
    'decryptPwdAes': decryptPwdAes,
    'encryptObjAes': encryptObjAes,
    'decryptObjAes': decryptObjAes
}