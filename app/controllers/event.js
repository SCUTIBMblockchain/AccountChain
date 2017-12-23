const getUrl = require('../../config/org-config').getUrl
const getOrg = require('../../config/org-config').getOrg
const request = require('request-promise-native')
function notify(info) {
    var detailInfo=JSON.parse(info);
    var orgs=detailInfo.orgs;
    var org = getOrg()
    var url= getUrl(org)
    var result = orgs.find((value)=>{
        return value == org
    })
    if(!result){
        return 
    }
    var options = {
        method: 'POST',
        url: url + '/auth/user/update',
        body: detailInfo,
        json: true
    };
    var response = request(options)
        .catch((err)=>{
            console.log(err)
            return false
        })
    console.log(response)
}

module.exports = {
    notify
}