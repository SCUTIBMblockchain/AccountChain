import { create } from 'domain';

/**
 *   *Blockchain 都是需要改成chaincode接口
 */
var loginIn = require('../services/login.js')
// var bodyParser =require('koa-bodyparser')
let Result = {
    'state': false,
    'info': null,
    'token': null
}
let state = -1;
const login = async function (ctx, next) {

    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '',
        org = ctx.request.body.org || '';
    state = await loginIn.checkAccountExist(name, org);
    var result = Object.create(Result)             //查询区块链是否有账号
    if (state == 0) {
        result = await loginIn.firstLogin(name, password, org);
        //TODO...
        if (result.state == true) {
            //登陆成功
        } else {
            //登录失败
        }

    } else if (state == 1) {
        if (loginIn.passwordExist(name, org)) {
            result = await loginIn.usualLogin(name, password, org);     //区块链登录
            //TODO...
        } else {
            result = await loginIn.noPwdLogin(name, password, org);     //密码不存在（刚修改密码
            //TODO...
        }

    } else {
        ctx.response.body = `<h1>Connect Failed. 404</h1>`;           //连接失败,之后再搞
    }
}

module.exports = login