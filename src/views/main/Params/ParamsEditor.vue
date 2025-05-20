<template>
  <el-dialog title="编辑产品" width="70%"
    :visible.sync="dialogEditorVisible" 
    @before-close="handleClose">
    <el-form label-width="100px" :model="editorForm" ref="editorForm">
      <el-form-item label="产品ID">
        <el-input v-model="editorForm.itemCatId" />
      </el-form-item>
      <el-form-item label="规格参数内容">  
        <div class="inputchild" v-for="(item, index) in editorForm.paramData" :key="index">  
            <el-input v-model="item.productName" placeholder="产品名称" />
            <el-input v-model="item.productOne" placeholder="子产品1" />  
            <el-input v-model="item.productTwo" placeholder="子产品2" />     
        </div>  
      </el-form-item> 
    </el-form>
    <!-- 添加对话框的取消 确定按钮 -->
    <span slot="footer" class="dialog-footer">
      <!-- 点击后关闭 添加对话框 -->
      <el-button @click="dialogEditorVisible = false">
        取 消
      </el-button>
      <!-- 点击后触发方法 将数据发给服务器存入mysql -->
      <el-button  type="primary" @click="editorProductHandle">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
// 编辑对话框
export default {
  data() {
    return {
      // 外面的对话框  
      dialogEditorVisible: false,
      // 里面的对话框
      dialogCategoryVisible: false,
      // 收集添加输入框表单数据
      editorForm: {
        itemCatId: '',
        paramData: [{ 
            productName: '',
            productOne: '',
            productTwo: '' 
        }]
      },
      currentData: {}
    }
  },
  mounted() {
    // 初始化渲染+请求数据后 数据回填 编辑对话框
    // 监听(接受数据)事件，打开对话框
    this.$bus.$on('onParamsEditorEvent', (row) => {
      this.dialogEditorVisible = true,
      // 通过这种形式把这条数据存起来
      this.currentData = row
    //   console.log(this.currentData)
    //   console.log(row.id)
      // 预更新接口
      this.$api.paramsPreEditor({id:row.id}).then((res) => {
        console.log(res.data.result)
        // 转为对象
        const paramData = JSON.parse(res.data.result[0].paramData)
        // console.log(paramData.productName)

        // 赋值的过程
        // 产品ID
        this.editorForm.itemCatId = res.data.result[0].itemCatId
        // 产品名称
        this.editorForm.paramData[0].productName = paramData.productName
        // 子产品1
        this.editorForm.paramData[0].productOne = paramData.productOne
        // 子产品2
        this.editorForm.paramData[0].productTwo = paramData.productTwo

      })
    })

  },
  methods: {
    // 关闭添加对话框
    handleClose() {
      this.dialogAddVisible = false;
    },
    // 编辑产品
    // 重新提交数据接口
    editorProductHandle() {
        // 编辑接口
        this.$api.paramsEditor({
            // 这个id是当前行数据
            id: this.currentData.id,
            // 而这下面几个必须用editorForm里面 因为这时实时输入的数据
            itemCatId: this.editorForm.itemCatId,
            productName: this.editorForm.paramData[0].productName,
            productOne: this.editorForm.paramData[0].productOne,
            productTwo: this.editorForm.paramData[0].productTwo
        }).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                // 关闭对话框
                this.dialogEditorVisible = false
                // 刷新页面
                this.$bus.$emit('refresh', true)
            }
        }).catch(err => {
            console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.location {
  float: left;
}
.tree {
  float: left;
  margin-left: 10px;
}
.upload-img {
  float: left;
  width: 200px;
  margin-left: 10px;
}
.inputchild {
    display: flex;
}
</style>