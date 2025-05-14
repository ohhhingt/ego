<template>
  <!-- :defuult-active="active"是激活菜单的索引 当前激活的菜单项 -->
  <!-- @select="handleSelect" 事件监听器 当用户选择菜单项时
  会调用handleSelect方法 -->
  <!-- router 表示菜单项使用 Vue Router进行路由导航 -->
  <el-menu :default-active="active" 
    mode="horizontal" 
    background-color="#545c64" 
    text-color="#fff" 
    active-text-color="#ffd04b" 
    @select="handleSelect"
    router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/product">商品管理</el-menu-item>
    <el-menu-item index="/params">规格参数</el-menu-item>
    <el-menu-item index="/ad">广告管理</el-menu-item>
    <el-menu-item class="user">
      <span class="user-name">{{ user.username }}</span>
      <el-button @click="logoutHandle">退出</el-button>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// 组件通常需要自己引入自己是为了在父组件中使用该组件
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      active: '/'
    }
  },
  computed: {
    // 导入login vuex 的user数据
    ...mapState('login', ['user'])
  },
  mounted() {
    if (sessionStorage.getItem('key')) {
      // 设置之后刷新浏览器 高亮类也会固定在某个选项卡
      this.active = sessionStorage.getItem('key')
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    logoutHandle() {
        // 清空vuex仓库
        this.setUser({})
        // 清空本地
        localStorage.removeItem('ego')
        // 跳转至登录页
        this.$router.push('/login')
    },
    // 点击菜单项时设置key
    handleSelect(key, keyPath) {
      sessionStorage.setItem('key', key)
      console.log(key)
    }
  }
}
</script>

<style scoped lang="less">
.user {
  float: right !important;
  margin-right: 20px !important;
  line-height: 60px !important;
  .user-name {
    color: #fff;
    margin-right: 10px;
    font-size: 15px;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    overflow: hidden;
  }
}
</style>