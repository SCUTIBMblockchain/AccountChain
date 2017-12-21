var loginIn = require('../services/login.js')
// todo add 函数
var accountCheck = require('../models/account')
// todo add 函数
var getAccountInfo = require('../network/account')
// var bodyParser =require('koa-bodyparser')
var loginFnc = {
    'FIRST': loginIn.firstLogin, // 未授权,区块链未保存
    'NOAUTH': loginIn.authLogin, // 未授权,区块链已保存
    'USUAL': loginIn.usualLogin, // 已授权,区块链已保存
    'FAIL': loginIn.failLogin   // 错误, 可能是密码错误,或服务器错误
}
const login = async function (ctx, next) {
    var state = 1
    var result = ''

    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '',
        org = ctx.request.body.org || '';
    
    var account = await getAccountInfo(name, org)
    var acountState = checkAccount(account)
    var loginResult =  await loginFnc[accountState.state](accountState.info)

    ctx.body = {
        state: loginResult.state,
        token: loginResult.token,
        info: loginResult.info
    }
}

module.exports = login