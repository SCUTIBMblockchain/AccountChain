const edit = require('../network/edit')

const update = async function (info) {
    var state = await edit.update(info)
    return state
}
const remove = async function (info) {
    var state = await edit.remove(info)
    return state
}
const add = async function (info) {
    var state = await edit.add(info)
    return state
}
const changePassword = async function (username, org) {
    var state = await edit.changePassword(username, org)
    return state
}
module.exports = {
    'update': update,
    'remove': remove,
    'add': add
}