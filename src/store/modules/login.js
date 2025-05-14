// 导出写法
export default {
    // 表示该模块是命名空间
    // 设置后其中的模块中的状态、getter、mutation 和 action 
    // 都会被限制在该模块的命名空间内
    namespaced: true,
    state: {
        user: {
            username: '',
            token: ''
        }
    },
    mutations: {
        setUser(state, user) {
            // 设置state中的user值
            state.user = user
        }
    },

}