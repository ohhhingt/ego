<template>
    <div class="params">
        <!-- show-overflow-tooltip当内容过长
        鼠标悬停在此处会显示提示框 -->
        <el-table :data="tableData">
            <el-table-column 
                prop="id" 
                label="规格参数ID" 
                width="90"
                show-overflow-tooltip>
            </el-table-column>
            <!-- 注意这个prop不能写错 不然数据无法展示 -->
            <el-table-column 
                prop="itemCatId" 
                label="产品关联ID" 
                width="90"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column 
                prop="paramData" 
                width="842"
                label="规格参数内容" 
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button size="mini"
                    @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 规格参数表格页面
export default{
 data() {
  return {
    tableData: [],
    extractedValues: [] // 存储提取的值 
  }
 },
 mounted() {
    // 一进来就会执行网络请求，刷新页面到第一页
    this.http(1)
    // 数据来自PubPagination 点击页码后显示对应的第几页
    this.$bus.$on('page', data => {
        this.http(data)
    })
    // 事件总线写好就会很清晰 来自哪里、作用
    // 数据来自PubHeader 用于显示搜索后的结果
    this.$bus.$on('onSearch', data => {
        console.log(data)
        // this.tableData = data
         this.tableData = data
    })
    this.$bus.$on('refresh', flag => {
        // 数据接受自ParamsAdd 用于刷新页面
        this.http(1)
    })
 },
 methods: {
    // 第几页
    http(page) {
        // 查询第几页的数据
        this.$api.paramsSearch({page}).then(res => {
            const data = res.data.result
            // console.log(data)
            // 查询后的数据给tableData表格展示
            this.tableData = Array.isArray(data) ? data : []; 
            // 调用处理函数
            // this.tableData = this.processData(data);  
        })
    },
    // 规格参数删除
    handleDelete(index, row) {
        console.log(index, row)
        console.log(row.id)
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$api.paramsDelete({id: row.id}).then(res => {
                console.log(res)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 如果删除成功立即刷新页面
                this.http(1)
            }).catch(err => {
                console.log(err)
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });    
            })
        }).catch(() => {
            // 右上角 点击后取消删除
            this.$message({
                type: 'info',
                message: '已取消删除'
            });  
        });
    },
    // 打开编辑对话框
    handleEdit(index, row) {
        this.$bus.$emit('onParamsEditorEvent', row)
    }
 }
}
</script>

<style scoped>
.params {
    width: 1200px;
    margin: 0 auto;
}
</style>