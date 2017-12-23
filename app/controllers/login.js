var loginIn = require('../services/login.js')
var checkAccount = require('../models/account').checkAccount
var getAccountInfo = require('../network/account').getAccountInfo
// var bodyParser =require('koa-bodyparser')
var loginFnc = {
    'FIRST': loginIn.firstLogin, // 未授权,区块链未保存
    'NOAUTH': loginIn.authLogin, // 未授权,区块链已保存
    'USUAL': loginIn.usualLogin, // 已授权,区块链已保存
    'PWCHANGE': loginIn.noPwdLogin, // 区块链已保存,密码被更新
    'FAIL': loginIn.failLogin   // 错误, 可能是密码错误,或服务器错误
}
const login = async function (ctx, next) {
    var state = 1
    var result = ''

    var username = ctx.request.body.username || '',
        password = ctx.request.body.password || '',
        org = ctx.request.body.org || '';

    var account = await getAccountInfo(username, org)
    var accountState = checkAccount(account, password)
    if(!accountState.info){
        accountState.info = {
            username: username,
            org: org,
            password: password
        }
    }
    var loginResult =  await loginFnc[accountState.state](accountState.info)

    ctx.body = {
        state: loginResult.state,
        token: loginResult.token,
        info: loginResult.info
    }
}

module.exports = login