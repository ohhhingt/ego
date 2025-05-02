<template>
  <div>
    Layout
    <el-button type="primary" @click="goToLogin">去登录页</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style>
</style>