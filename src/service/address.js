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
    //添加食物
    addFood: host + '/api/addFood',
    //查询所有菜单
    findAllFood: host + '/api/findAllFood',
    //删除菜单
    deleteFood: host + '/api/deleteFood',
    //编辑菜单
    editFood: host + '/api/editFood',
}

module.exports = Connect