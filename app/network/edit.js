const request = require('request-promise-native')
const update = async function (info) {
    var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model.updateShareInfoTranc',
        body: info,
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
const remove = async function (info) {
    var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model.removeTranc',
        body: info,
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
const add = async function (info) {
    var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model.pushTranc',
        body: info,
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
const changePassword = async function (org, username) {
    var options = {
        method: 'POST',
        url:'http://localhost:3000/api/org.acme.model./org.acme.model.setPwNullTranc',
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
    'update': update,
    'remove': remove,
    'add': add
}