<template>
  <el-dialog title="添加产品" width="70%"
    :visible.sync="dialogAddVisible" 
    @before-close="handleClose">
    <el-form 
    label-width="100px" 
    :model="addForm" 
    ref="addForm">
      <el-form-item label="产品ID">
        <el-input v-model="addForm.itemCatId" />
      </el-form-item>
      <el-form-item label="规格参数内容">  
        <div class="inputchild" v-for="(child, index) in addForm.paramData" :key="index">  
            <el-input v-model="child.productName" placeholder="产品名称" />
            <el-input v-model="child.productOne" placeholder="子产品1" />  
            <el-input v-model="child.productTwo" placeholder="子产品2" />    
            <el-button @click="removeChild(index)">删除</el-button>  
        </div>  
      </el-form-item>  
    </el-form>
    <!-- 添加对话框的取消 确定按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addChild">添加子项</el-button>  
      <!-- 点击后关闭 添加对话框 -->
      <el-button @click="dialogAddVisible = false">
        取 消
      </el-button>
      <!-- 点击后触发方法 将数据发给服务器存入mysql -->
      <el-button  type="primary" @click="addProductHandle">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
// 添加对话框(规格参数)
// 任务 1. 添加到数据库中
export default {

  data() {
    return {
      // 外面的对话框  
      dialogAddVisible: false,
      // 里面的对话框
      dialogCategoryVisible: false,
      // 收集添加输入框表单数据
      addForm: {
        itemCatId: '10002',
        paramData: [{ 
            productName: '电脑',
            productOne: '',
            productTwo: '' 
        }]
      },
      // 数据库推入数据
      axiosData: []
    }
  },
  mounted() {
    // 监听(接受数据)事件，打开对话框
    this.$bus.$on('onAddEvent', flag => {
        console.log(flag)
        // 数据来自PubHeader.vue
        // 用于打开添加对话框
        this.dialogAddVisible = flag
    })
  },
  methods: {
    // 对话框
    // 关闭对话框
    handleClose() {
      this.dialogAddVisible = false;
    },
    // 添加子项
    addChild() {  
        this.addForm.paramData.push({ childValue: '' });  
    },  
    // 删除方法
    removeChild(index) {  
        this.addForm.paramData.splice(index, 1);  
    },
    // 添加产品
    addProductHandle() {
        // 收集表单数据为paramData对象
        const paramData = {  
          paramData: this.addForm.paramData.map(child => ({  
            productName: child.productName,  
            productOne: child.productOne,
            productTwo: child.productTwo
          }))  
        };  
      console.log(paramData); // 处理提交的数据  
      this.$api.paramsAdd({
        itemCatId: this.addForm.itemCatId,  
        paramData: paramData
      }).then(res => {
        console.log(res)
        if (res.data.status === 200) {
          // 关闭添加对话框
          this.dialogAddVisible = false
          // 传给ProductList 刷新页面
          // 这个true也可以不传 只是作为标识
          this.$bus.$emit('refresh', true)
        }
      }).catch(err => {
        console.log(err)
      })
    },

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