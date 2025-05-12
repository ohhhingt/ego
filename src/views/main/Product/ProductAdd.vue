<template>
  <el-dialog title="添加产品" :visible.sync="dialogAddVisible" width="70%" @before-close="handleClose">
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类目">
        <el-button type="primary"
        @click="dialogCategoryHandle">类目选择</el-button>
        <el-dialog width="50%" append-to-body
        title="类目选择" :visible.sync="dialogCategoryVisible"
        >
        <ProductTree />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
            </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="addForm.sellPoint" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="addForm.price" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="addForm.num" />
      </el-form-item>
      <el-form-item label="商品图片">
          <el-button type="primary"
            @click="dialogUploadHandle">图片上传</el-button>
            <el-dialog 
            width="50%" 
            append-to-body
            title="图片上传" 
            :visible.sync="dialogUploadVisible">
                <ProductUpload />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogUploadVisible = false">确 定</el-button>
            </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import ProductTree from './ProductTree.vue'
import ProductUpload from './ProductUpload.vue'
// 添加对话框
export default {
  components: {
    ProductTree,
    ProductUpload
  },
  data() {
    return {
      // 外面的对话框  
      dialogAddVisible: false,
      // 里面的对话框
      dialogCategoryVisible: false,
      // 图片上传对话框
      dialogUploadVisible: false,
      addForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: ''
      }
    }
  },
  mounted() {
    this.$bus.$on('onAddEvent', flag => {
      this.dialogAddVisible = flag
    })
  },
  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          // 关闭对话框
          this.dialogAddVisible = false;
        })
        .catch(_ => { });
    },
    dialogCategoryHandle() {
        this.dialogCategoryVisible  = true
    },
    dialogUploadHandle() {
        this.dialogUploadVisible  = true
    }
  }
}
</script>

<style>
</style>