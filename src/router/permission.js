import router from './index'
import store from '../store'

// 定义全局前置守卫
router.beforeEach((to, from, next) => {
    // 检查目标路由的元信息
    if (to.meta.isLogin) {
        let token = store.state.login.user.token;
        // 如果token存在
        if (token) {
            // 放行
            next()
        // 如果token不存在
        } else {
            next({ name: 'Login' }); // 用户未登录，重定向到登录页面 
        }
    // 如果目标路由不需要登录，直接调用 next() 继续导航
    } else {
        next()
    }
})