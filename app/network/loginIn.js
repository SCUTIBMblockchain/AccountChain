var request = require('request-promise-native')
var getUrl = require('../../config/org-config').getUrl
const loginByOrg = async function (username,password,org) {
    var orgUrl = getUrl(org)
    var options = {
        method:'POST',
        url: orgUrl + '/auth/user',              
        body: {
            account: username,
            password:password
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
    var info = response.info
    if(response.returnSuccess) {
        // 返回成功
        if(info.success){
            info.state = true
            return info
        }else{
            info.state = 'PWWRONG'
            return info
        }
    }else {
        // 返回失败
        return {
            state: 'SERVERERROR',
            info: info
        }
    }
    
}
module.exports={
    'loginByOrg':loginByOrg
}