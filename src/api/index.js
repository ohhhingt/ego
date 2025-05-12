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
    // 商品列表
    selectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    // 商品总条数
    total() {
        return axios.get(base.baseUrl + base.total)
    },
    // 模糊查询
    search(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    // 类目请求
    selectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId, {
            params
        })
    },
    // 商品添加
    insertTbItem(params) {
        // 打印请求体 到这里也是有数据的
        console.log('发送的请求体:', params); 
        // 在url中获取参数 params需要用对象
        return axios.get(base.baseUrl + base.insertTbItem, {params})
    }
}

export default api