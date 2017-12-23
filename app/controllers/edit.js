const editFnc = require('../services/edit')
const decode = require('../models/tool').decryptObjAes
const edit = async function (ctx, next) {
   var type = ctx.request.body.type
   var token = ctx.request.body.token
   
   var info = {
    org: ctx.request.body.org,
    username: ctx.request.body.username,
    key: ctx.request.body.key,
    newValue: ctx.request.body.value
   }
   if(token) {
    var userInfo = decode(token)
    info.org = userInfo.org
    info.username = userInfo.username
    }
   var state = ''
   switch (type) {
        case '0':
            state = await editFnc.update(info)
            break;
        case '1':
            state = await editFnc.add(info)
            break;
        case '2':
            state = await editFnc.remove(info)
       default:
            state = 'ERROR: index not exist'
           break;
   }
   ctx.body ={
       state: state
   }
}
const changePassword = async function (ctx, next) {
    var org = ctx.request.body.org
    var username = ctx.request.body.username
    var loginInfo = ctx.request.body.loginInfo
    var state = await editFnc.changePassword(org, username)
    ctx.body = state
 }
module.exports = {
    "edit": edit,
    "changePassword": changePassword
}