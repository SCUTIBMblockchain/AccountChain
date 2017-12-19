const editFnc = require('../services/edit')
const edit = async function (ctx, next) {
   var type = ctx.req.body.type
   var info = ctx.req.body.info
   var loginInfo = ctx.req.body.loginInfo
   switch (type) {
        case 0:
            var state = await editFnc.update(info)
            break;
        case 1:
            var state = await editFnc.add(info)
            break;
        case 2:
            var state = await editFnc.remove(info)
       default:
            var state = 'ERROR: index not exist'
           break;
   }
   ctx.body.state = state
}
const changePassword = async function (ctx, next) {
    var org = ctx.req.body.org
    var username = ctx.req.body.username
    var loginInfo = ctx.req.body.loginInfo
    var state = await editFnc.changePassword(org, username)
    ctx.body.state = state
 }
module.exports = {
    "edit": edit,
    "changePassword": changePassword
}