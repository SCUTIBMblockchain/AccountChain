const bcrypt = require("bcryptjs")
const getToken = function (org, username) {
    // return JSON.stringify({
    //     org: org,
    //     username: username
    // })
    return 'xxxxxxx'
}

//https://www.npmjs.com/package/bcryptjs
const hashPwd = function (password) {
    const SALT_FACTOR = 10        //加盐随机数
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            //TODO...
            //hash is the encrypt password, Store hash in your password DB. 
        });
    });
}//void async
const comparePwd = function (password) {
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
const existy = function (thing) {
    
}
module.exports = {
    'getToken': getToken,
    'hashPwd': hashPwd,
    'comparePwd': comparePwd
}