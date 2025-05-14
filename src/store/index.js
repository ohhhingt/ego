import Vue from 'vue'
import Vuex from 'vuex'
// 将Vue store 分离出去了
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login
  }
})
