<template>
  <div>
    <el-table :data="tableData">
      <!-- show-overflow-tooltip
      这个属性用于在单元格内容溢出时显示工具提示 -->
      <!-- prop 指定该列对应的数据字段 -->
      <el-table-column 
      show-overflow-tooltip prop="id" label="产品ID" width="100">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="title" label="商品名称" width="150">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="image" label="商品图片" width="100">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="sellPoint" label="商品卖点" width="300">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column 
      show-overflow-tooltip prop="descs" label="商品描述">
        <!-- scope是提供当前行信息的一个语法 -->
        <template v-slot="scope">
          <!-- <button @click="clickDemo(scope)">点击</button> -->
          <!-- 这个数据是一个标签所以用v-html -->
          <div v-html="scope.row.descs"></div>
        </template> 
      </el-table-column>
       <el-table-column label="操作">
         <template v-slot="scope">
          <!-- $index是索引下标 row是第几行 -->
          <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    // 默认加载第一页数据
    this.http(1);
    // 监听ProductPagination的数据
    this.$bus.$on('page', page => {
      console.log(`分页器传给表格的页码${page}`)
      // http是一个方法
      this.http(page)
    })
    // 数据接受自ProductHeader
    this.$bus.$on('searchData', data => {
      // 这个是查询后的结果 用于渲染表格
      this.tableData = data
    })
    // 数据接受自ProductAdd、ProductEditor
    this.$bus.$on('refresh', flag => {
      // 传个1 就是要请求第一页的数据
      this.http(1)
    })
  },
  methods: {
    // 展示第几页的方法
    http(page) {
      // 将传给来的page传给api接口方法中，让其知道要查询哪一页的数据。
      this.$api.itemSearch({page}).then(res => {
        //   console.log(res)
        if (res.data.status === 200) {
          this.tableData = res.data.result
        }
      })
    },
    // clickDemo(scope) {
    //   console.log(scope)
    // }
    // 编辑按钮
    handleEdit(index, row) {
      console.log(row)
      // 传给ProductEditor
      this.$bus.$emit('onEditorEvent', row)
    },
    // 删除按钮
    handleDelete(index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.$api.itemDelete({id: row.id}).then(res => {
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 刷新表格数据 重新加载第一页的数据
              this.http(1);
            } else {
              this.$message({
                type: 'errow',
                 message: '删除失败!'
              });  
            }
          })
        }).catch(() => {
           // 右上角 点击后取消删除
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }
  }
}
</script>

<style scoped>
</style>