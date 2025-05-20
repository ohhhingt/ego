import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from '../views/main/Product/index.vue'
import Params from '../views/main/Params/index.vue'
import ADCategory from '../views/main/ADCategory.vue'
import Login from '../views/Login.vue'
import Home from '../views/main/HomePage/Home.vue'
import Details from '../views/main/HomePage/sub/Details.vue'
import openproduct from '../views/main/HomePage/sub/openproduct.vue'
import golife from '../views/main/HomePage/sub/golife.vue'
import heigh from '../views/main/HomePage/sub/heigh.vue'
import logo from '../views/main/HomePage/sub/logo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    // redirect: '/product', // 在这里重定向到 /product
    // 渲染出口
    children:[
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'product',
        name: 'Product',
        component: Product,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'params',
        name: 'Params',
        component: Params,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'ad',
        name: 'ADCategory',
        component: ADCategory,
        meta: {
          isLogin: true
        }
      },
      {
        path: 'details',
        name: 'Details',
        component: Details,
        // 下面这里已经是三级路由了
        children: [
          {
            path: 'openproduct',
            name: 'OpenProduct',
            component: openproduct
          },
          {
            path: 'golife',
            name: 'golife',
            component: golife
          },
          {
            path: 'heigh',
            name: 'heigh',
            component: heigh
          },
          {
            path: 'logo',
            name: 'logo',
            component: logo
          }
        ]
      }
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
