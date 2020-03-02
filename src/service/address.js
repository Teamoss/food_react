//主机地址
const host = 'http://localhost:5000'
// const host = 'http://192.168.1.167:5000'

let Connect = {
    host,
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
    //上传商家描述图片
    uploadSwiper: host + '/api/uploadSwiper',
    //添加菜单
    addFood: host + '/api/addFood',
    //查询所有菜单
    findAllFood: host + '/api/findAllFood',
    //删除菜单
    deleteFood: host + '/api/deleteFood',
    //编辑菜单
    editFood: host + '/api/editFood',
    //查询商家所有订单
    findAllBusinessOrder: host + '/api/findAllBusinessOrder',
    //订单状态改变
    changeOrder: host + '/api/changeOrder',
    //查看顾客评论
    findAllComment: host + '/api/findAllComment',
    //商家回复
    businessComment:host + '/api/businessComment',
    //管理员登录
    adminLogin: host + '/api/adminLogin',
    //管理员注册
    adminRegister: host + '/api/adminRegister',
    //管理員管理商家
    adminBusiness:host + '/api/adminBusiness',
    //删除商家
    deleteBusiness:host + '/api/deleteBusiness',
}

module.exports = Connect