const request = require('request-promise-native')
const add2Blockchain = async function (username, password, org, info) {
    var block = {
        'username': username,
        'password': password,
        'org': org,
        'info': info
    }
    var options = {
        method: 'POST',
        url: '',                //todo
        body: block,
        json: true
    };
    var response = await request(options).catch((err) => {
        console.log(err)
        return false
    })
    if (response) {
        cons.log('receive log :' + response)
        return true
    }
}//void 
const queryAccountExist = async function (username, org) {
    var options = {
        uri: '',                //todo
        qs: {
            username: username,
            org: org
            //token
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    request(options)
        .then(function (repos) {
            if (repos.length > 0)
                return true
            else return false
        })
        .catch(function (err) {
            console.log(err)
            return false
        });
}//bool
const queryPwdExist = async function (username, org) {
    var options = {
        uri: '',                //todo
        qs: {
            username: username,
            org: org
            //token
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    request(options)
        .then(function (repos) {
            if (repos.length > 0)
                return true
            else return false
        })
        .catch(function (err) {
            console.log(err)
            return false
        });
}//bool
const validateInBlockchain = async function (username, password, org) {
    var options = {
        uri: '',                //todo
        qs: {
            username: username,
            password: password,
            org: org
            //token
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    request(options)
        .then(function (repos) {
            if (repos.length > 0)
                return true
            else return false
        })
        .catch(function (err) {
            console.log(err)
            return false
        });
}//bool
const getLoginInfoInBlockchain = async function (username, org) {
    var options = {
        uri: '',                //todo
        qs: {
            username: username,
            org: org
            //token
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    request(options)
        .then(function (repos) {

        })
        .catch(function (err) {

        });
}//info
const save2Blockchain = async function (username, password, org, info) {
    var block = {
        'username': username,
        'password': password,
        'org': org,
        'info': info
    }
    var options = {
        method: 'POST',
        url: '',                //todo
        body: block,
        json: true
    };
    var response = await request(options).catch((err) => {
        console.log(err)
        return false
    })
    if (response) {
        cons.log('receive log :' + response)
        return true
    }
}//void
const authorizeOrg = async function (username, org, newOrg) {
    var authorization = {
        'username': username,
        'org': org,
        'newOrg': newOrg
    }
    var options = {
        method: 'POST',
        url: '',                //todo
        body: authorization,
        json: true
    };
    var response = await request(options).catch((err) => {
        console.log(err)
        return false
    })
    if (response) {
        cons.log('receive log :' + response)
        return true
    }
}//void
module.exports = {
    'add2Blockchain': add2Blockchain,
    'queryAccountExist': queryAccountExist,
    'queryPwdExist': queryPwdExist,
    'validateInBlockchain': validateInBlockchain,
    'getLoginInfoInBlockchain': getLoginInfoInBlockchain,
    'save2Blockchain': save2Blockchain,
    'authorizeOrg': authorizeOrg
}