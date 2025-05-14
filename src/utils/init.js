import store from '../store'
//  这行代码尝试从浏览器的本地存储中获取名为 ego 的项
if (localStorage.getItem('ego')) {
    // store.commit: 这是 Vuex 中用于提交一个 mutation 的方法
    // 获取本地存储后 提交到vuex保存状态
    store.commit('login/setUser', JSON.parse(localStorage.getItem('ego')))
}