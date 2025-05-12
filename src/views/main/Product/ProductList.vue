<template>
  <div>
    <el-table :data="tableData">
      <el-table-column show-overflow-tooltip prop="id" label="产品ID" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="商品名称" width="200">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="image" label="商品图片" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点" width="300">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
        <template v-slot="scope">
          <button @click="clickDemo(scope)">点击</button>
          <div v-html="scope.row.descs"></div>
        </template> 
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 表格
export default {
  data() {
    return {
      // 根据这个数组渲染表格数据
      tableData: []
    }
  },
  mounted() {
    this.http(1);
    this.$bus.$on('page', page => {
      console.log(`分页器传给表格的页码${page}`)
      // http是一个方法
      this.http(page)
    })
    this.$bus.$on('searchData', data => {
      this.tableData = data
    })
    this.$bus.$on('refresh', flag => {
      // 传个1 就是要请求第一页的数据
      this.http(1)
    })
  },
  methods: {
    http(page) {
      // 将传给来的page传给api接口方法中，让其知道要查询哪一页的数据。
      this.$api.selectTbItemAllByPage({page}).then(res => {
        //   console.log(res)
        if (res.data.status === 200) {
          this.tableData = res.data.result
        }
      })
    },
    clickDemo(scope) {
      console.log(scope)
    }
  }
}
</script>

<style scoped>
</style>