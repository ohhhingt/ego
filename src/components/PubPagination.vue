<template>
  <div class="pagination-container">
      <!-- 
      注意事件要用@ total是总条数 从api获取
      @size-change="handleSizechange" 当用户改变每页显示的条目数 触发
      :current-page.sync="currentPage" 
      这个属性双向绑定了 currentPage 数据属性，表示当前页码
      @current-change="handleCurrentChange": 
      这是一个事件监听器，当当前页码改变时 触发 -->
      <el-pagination layout="prev, pager, next, jumper" 
      :total="total" 
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
// 分页器
export default {
  data() {
    return {
        currentPage: 1,

    }
  },
  props: {
    total: {
        type: [String, Number],
        default: 0
    }
  },
  methods: {
    hanleSizechange() {},
    // 处理当前页码变化的逻辑
    handleCurrentChange(val) {
      // console.log(val)
      // 点击后将当前页码 传给ParamstList
      this.$bus.$emit('page', val)
    }
  }
}
</script>

<style scoped>
.pagination-container {
    margin-top: 40px;
}
</style>