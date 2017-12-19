/**
 *   *Blockchain 都是需要改成chaincode接口
 */
var request = request('request');
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
    await checkAccountExist(name, org);             //查询区块链是否有账号
    if (state == 0) {
        await firstLogin(name, password, org);
        //TODO...
        if (Result.state == true) {
            //登陆成功
        } else {
            //登录失败
        }

    } else if (state == 1) {
        if (passwordExist(name, org)) {
            await usualLogin(name, password, org);     //区块链登录
            //TODO...
        } else {
            await noPwdLogin(name, password, org);     //密码不存在（刚修改密码
            //TODO...
        }

    } else {
        ctx.response.body = `<h1>Connect Failed. 404</h1>`;           //连接失败,之后再搞
    }
}

const checkAccountExist = async function (username, org) {
    const result = await queryBlockchain(username, org)         //默认chaincodeAPI是queryBlockchain
    if (result == true) state = 1;
    else state = 0;
}

const firstLogin = async function (username, password, org) {
    const response = await loginByOrg(username, password, org)
    if (response.state == true) {
        Result.state = true
        Result.info = response.info
        await add2Blockchain(username, password, org, Result.info)//添加到区块链
        //Token
    } else {
        Result.state = false;
    }
}

const passwordExist = async function (username, org) {
    const result = await queryBlockchain(username, org)         //默认chaincodeAPI是queryBlockchain
    return result                                               //返回是bool
}

const usualLogin = async function (username, password, org) {
    var result = validateInBlockchain(username, password, org)
    if (result == true) {
        Result.info = getLoginInfoInBlockchain(username, org)
        Result.state = true
        //TODO...登录成功
    } else {
        Result.state = false
        //TODO...登录失败
    }
}

const noPwdLogin = async function (username, password, org) {
    const result = await loginByOrg(username, password, org)
    if (result == true) {
        Result.state = true
        Result.info = getLoginInfoInBlockchain(username, org)
        await save2Blockchain(username, password, org, Result.info)//保存到区块链
    } else {
        Result.state = false;
    }
}


module.exports = login