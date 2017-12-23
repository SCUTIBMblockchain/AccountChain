var orgConfig ={
    thisOrg: 'org1',
    orgURL: {
        "org1": "http://192.168.8.94:8889",
        "org2": "http://localhost",
        "org3": "http://localhost"
    }
}

const getOrg = function () {
    return orgConfig.thisOrg
}
const getUrl = function (org) {
    return orgConfig.orgURL[org]
}
// todo 设定org
const setOrg = function (url) {
}
module.exports = {
    getOrg,
    getUrl
}