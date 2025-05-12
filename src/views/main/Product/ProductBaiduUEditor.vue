<template>
  <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
</template>

<script>
// 1. 引入资源错位/位置错误
// 2. 配置错误
import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      msg: '<h2>Hello World!</h2>',
      myConfig: {
        // 编辑器不知道被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口
        serverUrl: 'http://localhost:3000/api/upload',
        // UEditor 资源文件的存放路径
        UEDITOR_HOME_URL: '/UEditor/'
      }
    }
  }
}
</script>

<style>
</style>