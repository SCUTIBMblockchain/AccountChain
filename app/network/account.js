const request = require('request-promise-native')
const getAccountInfo = async function (username, org) {
    var options = {
        uri: 'http://localhost:3000/api/queries/findAccount',              
        qs: {
            userNameParam: username,
            orgParam: org
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    var response = await request(options)
        .then((response)=>{
            return {
                returnSuccess: true,
                info: response
            }
        })
        .catch(function (err) {
            return {
                returnSuccess: false,
                info: err
            }
        })
    // 返回信息判断
    var info = response.info
    if(response.returnSuccess) {
        info.state = true
        return info
    }else {
        // 返回失败
        return {
            state: 'CHAINCODEERROR',
            info: info
        }
    }
}
const savePassword = async function (username, org, password) {
    var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model.updatePwTranc',
        body: {
            username: username,
            org: org,
            newPw: password
        },
        json: true
    };
    var response = await request(options).catch((err)=>{
        console.log(err)
        return false
    })
    if(response){
        console.log('receive log: ')
        console.log(response)
        return true
    }
    return false    
}

const makePasswordEmpty = async function (username, org) {
     var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model.setPwNullTranc',
        body: {
            username: username,
            org: org
        },
        json: true
    };
    var response = await request(options).catch((err)=>{
        console.log(err)
        return false
    })
    if(response){
        console.log('receive log: ')
        console.log(response)
        return true
    }
    return false
}
module.exports = {
    makePasswordEmpty: makePasswordEmpty,
    savePassword: savePassword,
    getAccountInfo: getAccountInfo
}