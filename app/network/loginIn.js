var request=require('request')
const loginByOrg = async function (username,password,org) {
    var options = {
        uri: '',                //todo
        qs: {
            username: username,
            password:password,
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
            return respos        //存疑
        })
        .catch(function (err) {
            console.log(err)
            return null
        });
}//response
//获得当前org
const getThisOrg=async function (params) {
    
}//string Org
module.exports={
    'loginByOrg':loginByOrg,
    'getThisOrg':getThisOrg
}