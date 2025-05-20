// 3000端口接口地址的拼接
const base = {
    // 基地址
    baseUrl: 'http://localhost:3000',
    // 查询接口(注意下面这个必须和后端一模一样 少一个字母都不行)
    search: '/api/users/search',
    // 登录接口地址
    login: '/api/users/login',
    // 注册接口地址
    register: '/api/users/register',


    // 商品管理: 🔧
    // project表 商品列表
    itemSearch: '/api/item/search',
    // 商品总条数
    itemTotal: '/api/item/total',
    // 模糊查询
    itemVagueSearch: '/api/item/vagueSearch',
    // 类目选择
    itemCategoryChoose: '/api/item/Categorychoose',
    // 商品添加
    itemAdd: '/api/item/add',
    // 商品删除
    itemDelete: '/api/item/delete',
    // 预更新接口
    itemEditorSearch: '/api/item/editorsearch',
    // 商品修改
    itemEditor: '/api/item/editor',

    
    // 规格参数:
    // 规格参数查询
    paramsSearch: '/api/params/search',
    // 规格参数模糊查询 这个在PubHeader.vue
    paramsVagueSearch: '/api/params/vaguesearch',
    // 规格参数添加
    paramsAdd: '/api/params/add',
    // 规格参数删除
    paramsDelete: '/api/params/delete',
    // 规格参数预更新
    paramsPreEditor: '/api/params/preeditor',
    // 规格参数修改
    paramsEditor: '/api/params/editor'


}

export default base;