<template>
  <div class="head">
    <!-- @submit 阻止表单默认提交事件 -->
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addFormHandle">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 搜索框、查询、添加区域
export default {
  data() {
    return {
      search: {
        content: ''
      }
    }
  },
  methods: {
    onSubmitSearch() {
      // 如果输入框内有输入东西
      if (this.search.content) {
        // 查询操作
        this.$api.search({
          search: this.search.content
        }).then(res => {
          console.log(res)
          if (res.data.status === 200) {
            // 数据发给ProductList
            this.$bus.$emit('searchData', res.data.result)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log('请输入数据')
      }
    },
    addFormHandle() {
      // 发送ProductAdd用于打开对话框
      this.$bus.$emit('onAddEvent', true)
    }
  }
}

</script>

<style scoped lang="less">
.el-form {
  overflow: hidden;
  clear: both;
  .el-form-item {
    float: left;
    margin-right: 10px;
    .el-input {
      width: 1020px;
    }
  }
}

.head {
  margin-top: 20px;
  width: 100%;
}
</style>