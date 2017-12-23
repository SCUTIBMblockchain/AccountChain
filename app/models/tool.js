const getToken = function (org, username) {
    return JSON.stringify({
        org: org,
        username: username
    })
}
const existy = function (thing) {
    
}
module.exports = {
    'getToken': getToken
}