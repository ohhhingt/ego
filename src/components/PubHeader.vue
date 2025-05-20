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
  props: {
    // 数据接受自 index.js
    searchHandle: {
      type: Function,
      required: true
    }
  },
  methods: {
    onSubmitSearch() {
      this.searchHandle({search: this.search.content}).then(res => {
        // 这里的数据没有出来 判断为后端错误
        console.log(res.data)
        // 发给ParamsList
        this.$bus.$emit('onSearch', res.data.result)
      })
    },
    addFormHandle() {
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