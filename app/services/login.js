var queryBlockchain = require('../network/queryBlockchain.js')
var getOrg = require('../../config/org-config').getOrg
var loginIn = require('../network/loginIn.js')
var account = require('../network/account')
var getToken = require('../models/tool').getToken

var Result = {
    'state': 1,
    'info': null,
    'token': null
}


const firstLogin = async function (accountInfo) {
    var username = accountInfo.username
    var password = accountInfo.password
    var org = accountInfo.organization
    const response = await loginIn.loginByOrg(username, password, org)
    var result = Object.create(Result)
    if (response.state === true) {
        var newOrg = getOrg()
        var addResult = await queryBlockchain.add2Blockchain(username, password, org, newOrg, response.shareInfo)
        if(addResult.state === true){
            result.state = 1
            result.info = response.shareInfo
            result.token = getToken(org, username)
            return result
        } else {
            return failLogin(addResult)
        }
    } else {
        return failLogin(response)
    }
}
const authLogin = async function (accountInfo) {
    var username = accountInfo.username
    var password = accountInfo.password
    var org = accountInfo.organization
    var authorizeResult = await queryBlockchain.authorizeOrg(username, org, getOrg())
    if(authorizeResult){
        var shareInfo = await queryBlockchain.queryShareInfo(shareInfoId)
        result.state = 1
        result.token = getToken(org, username)
        return result 
    } else {
        return failLogin(authorizeResult)
    }
}

const usualLogin = async function (accountInfo) {
    var username = accountInfo.username
    var password = accountInfo.password
    var org = accountInfo.organization
    // 调整登陆验证
    var result = Object.create(Result)
    result.token = getToken(username, org)
    return result
}

const noPwdLogin = async function (accountInfo) {
    var username = accountInfo.username
    var password = accountInfo.password
    var org = accountInfo.organization
    var auth = accountInfo.auth
    // * chaincode shareInfo 应该更改
    var shareInfoId = accountInfo.sharedInfo
    const response = await loginIn.loginByOrg(username, password, org)
    var result = Object.create(Result)
    if (response.state == true) {
        var saveResult = account.savePassword(username, password, org)//保存到区块链
        if (saveResult == true) {
            if(auth){
                result.state = 1
                result.token = getToken(org, username)
                return result
            }else{
                return authLogin(accountInfo)
            }
        } else {
            return failLogin(response)
        }
    } else {
        return failLogin(response)
    }
}
const failLogin = function (res) {
    var result = Object.create(Result)
    switch (res.state) {
        case 'PASSWORDWRONG':
            result.state = 2
            break;
        case 'CHAINCODEERROR':
            result.state = 0
            result.info = res.info
            break;
        case 'SERVERERROR':
            result.state = 0
            result.info = res.info
        default:
            result.state = 0
            result.info = 'the reason is unknow'
            break;
    }
}
module.exports = {
    'firstLogin': firstLogin,
    'usualLogin': usualLogin,
    'noPwdLogin': noPwdLogin,
    'authLogin': authLogin,
    'failLogin': failLogin
}