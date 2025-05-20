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
        total: 0
    }
  },
  mounted() {
    // 1. 也就是说 它虽然一共有12条 但是它只会返回10条
    // 因为设置了mysql语句
    // 2. 然后分页器其实路基较多 另起一个.vue文件可以解构清晰
    this.$api.itemTotal().then(res => {
        if (res.data.status === 200) {
            // 返回一共有多少条数据
            // console.log(res.data.result[0]['count(*)'])
            this.total = res.data.result[0]['count(*)']
        }
    })
  },
  methods: {
    // 处理当前页码变化的逻辑
    handleCurrentChange(val) {
      console.log(val)
      // 点击后传给ProductList
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