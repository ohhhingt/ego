const base = {
    // 基地址
    baseUrl: 'http://localhost:3000',
    // 注册接口地址
    register: '/api/user-register',
    // 登录接口地址
    login: '/api/login',
    // 查询接口(注意下面这个必须和后端一模一样 少一个字母都不行)
    search: '/api/users',
    // project表 商品列表
    selectTbItemAllByPage: '/api/backend/item/selectTbItemAllByPage',
    // 商品总条数
    total: '/api/total',
    // 模糊查询
    search: '/api/search',
    // 类目选择
    selectItemCategoryByParentId: '/api/backend/itemCategory/selectItemCategoryByParentId'
}

export default base;