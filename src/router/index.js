import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from '../views/main/Product.vue'
import Params from '../views/main/Params.vue'
import ADCategory from '../views/main/ADCategory.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/product', // 在这里重定向到 /product
    children:[
      {
        path: '/product',
        name: 'Product',
        component: Product,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/params',
        name: 'Params',
        component: Params,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/ad',
        name: 'ADCategory',
        component: ADCategory,
        meta: {
          isLogin: true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
