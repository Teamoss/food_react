//跟地址
let host = 'http://localhost:3000'

let Connect = {
    login : host + '/api/login' ,//登录
    register:  host + '/api/register', //注册
    getBusinessMessage:  host + '/api/getBusinessMessage' //获取商家信息
}

module.exports = Connect