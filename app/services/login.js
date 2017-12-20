
var queryBlockchain = require('../network/queryBlockchain.js')
var loginIn = require('../network/loginIn.js')
function count(obj) {
    var objType = typeof obj
    if (objType === 'string') {
        return obj.length
    } else if (objType === 'object') {
        var objLen = 0
        for (var i in obj) {
            objLen++
        }
        return objLen
    }
    return false
}

let Result = {
    'state': false,
    'info': null,
    'token': null
}


const checkAccountExist = async function (username, org) {
    const result = await queryBlockchain.queryAccountExist(username, org)         //默认chaincodeAPI是queryBlockchain
    if (result == true) return 1;
    else return 0;
}


const firstLogin = async function (username, password, org) {
    const response = await loginIn.loginByOrg(username, password, org)
    var result = Object.create(Result)
    if (response.state == true) {
        result.state = true
        result.info = response.info
        //TODO...get newOrg
        var newOrg = await loginIn.getThisOrg()
        await queryBlockchain.authorizeOrg(username, password, org, newOrg)
        try {
            await queryBlockchain.add2Blockchain(username, password, org, result.info)//添加到区块链
        } catch (error) {
            console.log(error)
        }

        //Token
    } else {
        result.state = false;
    }
    return result
}

const passwordExist = async function (username, org) {
    const result = await queryBlockchain.queryPwdExist(username, org)         //默认chaincodeAPI是queryBlockchain
    return result                                               //返回是bool
}

const usualLogin = async function (username, password, org) {
    var response = queryBlockchain.validateInBlockchain(username, password, org)
    var result = Object.create(Result)
    if (response.state == true) {
        result.info = queryBlockchain.getLoginInfoInBlockchain(username, org)
        result.state = true
        //TODO...登录成功
    } else {
        result.state = false
        //TODO...登录失败
    }
    return result
}

const noPwdLogin = async function (username, password, org) {
    const response = await loginIn.loginByOrg(username, password, org)
    var result = Object.create(Result)
    if (response.state == true) {
        result.state = true
        result.info = queryBlockchain.getLoginInfoInBlockchain(username, org)
        try {
            await queryBlockchain.save2Blockchain(username, password, org, result.info)//保存到区块链
        } catch (error) {
            console.log(error)
        }
    } else {
        result.state = false;
    }
    return result
}

module.exports = {
    'checkAccountExist': checkAccountExist,
    'firstLogin': firstLogin,
    'passwordExist': passwordExist,
    'usualLogin': usualLogin,
    'noPwdLogin': noPwdLogin
}