//主机地址
let host = 'http://localhost:5000'

let Connect = {
    //登录
    login: host + '/api/login',
    //注册
    register: host + '/api/register',
    //获取商家信息
    getBusinessMessage: host + '/api/getBusinessMessage',
    //编辑商家信息
    editBusinessMessage: host + '/api/editBusinessMessage',
    //上传商家logo图片
    uploadLogo: host + '/api/uploadLogo',
}

module.exports = Connect