import axios from '../utils/request'
import base from './base'

// 这里其实就是封装了axios请求
const api = {
    // 注册
    register(params) {
        // console.log(base.baseUrl + base.register, params)
        return axios.post(base.baseUrl + base.register, params)
    },
    // 登录
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    // 查询
    search() {
        return axios.get(base.baseUrl + base.search)
    },
    // 🔧
    // 商品列表，改这个里面，后面的地址也要修改
    itemSearch(params) {
        return axios.get(base.baseUrl + base.itemSearch, {
            params
        })
    },
    // 商品总条数
    itemTotal() {
        return axios.get(base.baseUrl + base.itemTotal)
    },
    // 模糊查询
    itemVagueSearch(params) {
        return axios.get(base.baseUrl + base.itemVagueSearch, {
            params
        })
    },
    // 类目请求
    itemCategoryChoose(params) {
        return axios.get(base.baseUrl + base.itemCategoryChoose, {
            params
        })
    },
    // 商品添加
    itemAdd(params) {
        // 打印请求体 到这里也是有数据的
        console.log('发送的请求体:', params); 
        // 在url中获取参数 params需要用对象
        return axios.get(base.baseUrl + base.itemAdd, {params})
    },
    // 商品删除
    itemDelete(params) {
        return axios.get(base.baseUrl + base.itemDelete, {
            params
        })
    },
    // 预更新接口
    itemEditorSearch(params) {
        // 中间这一段是地址拼接
        return axios.get(base.baseUrl + base.itemEditorSearch, {
            params
        })
    },
    // 商品修改
    itemEditor(params) {
        return axios.get(base.baseUrl + base.itemEditor, {
            params
        })
    },

    
    // 规格参数查询
    paramsPagSearch(params) {
        return axios.get(base.baseUrl + base.paramsPagSearch, {
            params
        })
    },
    // 规格参数模糊查询
    paramsVagueSearch(params) {
        return axios.get(base.baseUrl + base.paramsVagueSearch, {
            params
        })
    },
    // 规格参数添加
    paramsAdd(params) {
        const { itemCatId, paramData } = params;
        console.log(itemCatId, paramData)
        console.log('发送的请求体:', params); 
        console.log('js', paramData.paramData[0]?.productName)
        return axios.get(base.baseUrl + base.paramsAdd, {
            params: {  
                itemCatId,  
                productName: paramData.paramData[0]?.productName || '',  
                productOne: paramData.paramData[0]?.productOne || '',  
                productTwo: paramData.paramData[0]?.productTwo || ''  
            }
        })
    },
    // 规格参数删除
    paramsDelete(params) {
        return axios.get(base.baseUrl + base.paramsDelete, {
            params
        })
    },

    // 规格参数预更新
    paramsPreEditor(params) {
        // console.log(params)
        return axios.get(base.baseUrl + base.paramsPreEditor, {
            params
        })
    },
    // 规格参数修改
    paramsEditor(params) {
        // console.log(params)
        return axios.get(base.baseUrl + base.paramsEditor, {
            params
        })
    },
}

export default api