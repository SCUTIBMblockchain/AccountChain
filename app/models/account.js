const auth = require('../network/queryBlockchain').authorizeOrg
const getOrg = require('../../config/org-config')
const checkAccount = function (accounts, password) {
    var result = {}
    result.info = account
    var account = accounts[0]
    // 为空说明区块链内不存在
    if(accounts.length == 0){
        result.state = 'FIRST'
        result.info = account
        return result
    }
    // 判断密码是否为空
    if(account.password.length){
        if (validPassword(account.password, password)) {
            // 判断是否被授权
            if(validAuth(account.authorizedApps, getOrg())){
                result.state = 'USUAL'
            } else {
                result.state = 'NOAUTH'            }
        } else {
            result.state = 'FAIL'
            result.info = 'PASSWORDWRONG'//密码错误
        }
    }else{
        result.state = 'PWCHANGE'
        if(validAuth(account.authorizedApps, getOrg())){
            result.info.auth = true
        } else {
            result.info.auth = false
        }
    }
    return result
}

// todo 验证密码,加上加密
const validPassword = function (password, passwordToValid) {
    return password==passwordToValid
}
const validAuth = function (authOrgs, org) {
   if([].find(org)){
       return true
   }else {
       return false
   }
}
module.exports = {
    checkAccount
}