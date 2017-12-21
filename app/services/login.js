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

var Result = {
    'state': false,
    'info': null,
    'token': null
}
const getAccountInfo = async function (username, org){
}
const checkAccount = async function (account) {
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
            if (await queryBlockchain.add2Blockchain(username, password, org, result.info))//添加到区块链
                console.log('add to Blockchain success.')
        } catch (error) {
            console.log(error)
        }

        //Token
    } else {
        result.state = false;
    }
    return result
}
const authLogin = async function (username, password, org) {
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
            if (await queryBlockchain.save2Blockchain(username, password, org, result.info))//保存到区块链
                console.log('save to Blockchain success.')
        } catch (error) {
            console.log(error)
        }
    } else {
        result.state = false;
    }
    return result
}

module.exports = {
    'checkAccount': checkAccount,
    'getAccountInfo': getAccountInfo,
    'firstLogin': firstLogin,
    'usualLogin': usualLogin,
    'noPwdLogin': noPwdLogin,
    'authLogin': authLogin,
    'failLogin': failLogin
}