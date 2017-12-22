var orgConfig ={
    thisOrg: 'org1',
    orgURL: {
        "org1": "localhost",
        "org2": "localhost"
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