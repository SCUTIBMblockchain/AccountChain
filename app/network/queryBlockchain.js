const request = require('request-promise-native')
const add2Blockchain = async function (username, password, org, orgNew, info) {
    info.id = org+username
    var block = {
        'username': username,
        'password': password,
        'org': org,
        'orgNew': orgNew,
        'shareInfo': info
    }
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/api/org.acme.model.saveTranc',
        body: block,
        json: true
    };
    var response = await request(options).then((response)=>{
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

const authorizeOrg = async function (username, org, newOrg) {
    var authorization = {
        'username': username,
        'org': org,
        'newOrg': newOrg
    }
    var options = {
        method: 'POST',
        url: 'http://localhost:3000/api/org.acme.model.authorizeTranc',
        body: authorization,
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
const queryShareInfo = async function (username, org) {
    var options = {
        uri: 'http://localhost:3000/api/org.acme.model.ShareInfo/',              
        qs: {
            id: org + username
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
    var info = response.info[0]
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

module.exports = {
    'add2Blockchain': add2Blockchain,
    'authorizeOrg': authorizeOrg,
    'queryShareInfo': queryShareInfo
}