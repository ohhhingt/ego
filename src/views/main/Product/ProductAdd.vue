<template>
  <!-- @before-close="handleClose": 
  在对话框关闭之前触发 handleClose 方法 -->
  <el-dialog title="添加产品" width="70%"
    :visible.sync="dialogAddVisible" 
    @before-close="handleClose">
    <!-- label-width="70px": 设置表单标签的宽度为 70 像素。 -->
    <!-- :model="addForm" 存储表单的值 -->
    <!-- ref="addForm" this.$refs.addForm 访问到这个表单 -->
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类目">
        <el-button type="primary" class="location"
          @click="dialogCategoryHandle">
          类目选择
        </el-button>
        <span class="tree">
          {{ treeData.name }}
        </span>
        <!-- append-to-body: 这个属性指示对话框应该
        被添加到 body 元素中，而不是其父元素 -->
        <!-- title="类目选择": 设置对话框的标题为“类目选择” -->
        <!-- .sync 修饰符允许对话框内部的操作（如关闭对话框）自动更新 
        dialogCategoryVisible 的值，从而实现双向数据绑定 -->
        <el-dialog width="50%" append-to-body title="类目选择" 
          :visible.sync="dialogCategoryVisible">
          <ProductTree @onTree="getTreeData" />
            <!-- 定义了一个footer插槽 -->
            <span slot="footer" class="dialog-footer">
                <!-- 点击确定关闭对话框 -->
                <el-button type="primary" 
                  @click="dialogCategoryVisible = false">
                  确 定
                </el-button>
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
          <el-button type="primary" class="location"
            @click="dialogUploadHandle">
            图片上传
          </el-button>
            <!-- 用于展示图片 -->
            <!-- 一般这种看不懂 莫名其妙的 一般就是事件总线发来的数据 -->
            <img class="upload-img" :src="uploadData.url" alt="">
            <el-dialog 
              width="50%" 
              append-to-body
              title="图片上传" 
              :visible.sync="dialogUploadVisible">
              <!-- onUpload由ProductUpload触发 -->
              <ProductUpload @onUpload="getOnUpload"/>
              <span slot="footer" class="dialog-footer">
                  <!-- 点击后关闭上传图片对话框 -->
                  <el-button type="primary" 
                    @click="dialogUploadVisible = false">
                    确 定
                  </el-button>
              </span>
            </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <!-- Wang富文本编辑器 -->
        <ProductWangEditor @onEditor="getEditor" />
      </el-form-item>
    </el-form>
    <!-- 添加对话框的取消 确定按钮 -->
    <span slot="footer" class="dialog-footer">
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
import ProductBaiduUEditor from './ProductBaiduUEditor.vue'
import ProductTree from './ProductTree.vue'
import ProductUpload from './ProductUpload.vue'
import ProductWangEditor from './ProductWangEditor.vue'

// 添加对话框
export default {
  components: {
    ProductTree,
    ProductUpload,
    ProductBaiduUEditor,
    ProductWangEditor
  },
  data() {
    return {
      // 外面的对话框  
      dialogAddVisible: false,
      // 里面的对话框
      dialogCategoryVisible: false,
      // 图片上传对话框
      dialogUploadVisible: false,
      // 收集添加输入框表单数据
      addForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: ''
      },
      treeData: {}, // 类目选择
      uploadData: {}, // 存储图片
      editorData: '' //富文本
    }
  },
  mounted() {
    // 监听(接受数据)事件，打开对话框
    this.$bus.$on('onAddEvent', flag => {
      this.dialogAddVisible = flag
    })
  },
  methods: {
    // 关闭添加对话框
    handleClose() {
      this.dialogAddVisible = false;
    },
    // 点击后打开 类目选择对话框
    dialogCategoryHandle() {
        this.dialogCategoryVisible  = true
    },
    // 点击后打开 图片上传对话框
    dialogUploadHandle() {
        this.dialogUploadVisible  = true
    },
    // 点击类目选项后 将数据注入显示
    getTreeData(data) {
      console.log(data)
      this.treeData = data
    },
    // 读取图片地址
    getOnUpload(data) {
      console.log(data)
      if (data.url) {
          data.url = data.url.replace('upload', 'http://localhost:3000')
      }
      this.uploadData = data
    },
    // 接受ProductWangEditor.vue富文本数据
    getEditor(data) {
      console.log(data)
      // 最后发送服务器存进mysql
      this.editorData = data
    },

    // 添加产品
    addProductHandle() {
      this.$api.insertTbItem({
        cid: this.treeData.cid,
        title: this.addForm.name,
        sellPoint: this.addForm.sellPoint,
        price: this.addForm.price,
        num: this.addForm.num,
        desc: this.editorData,
        image: this.uploadData.url
      }).then(res => {
        console.log(res)
        if (res.data.status === 200) {
          // 关闭这个添加对话框
          this.dialogAddVisible = false
          // 传给ProductList
          // 这个true也可以不传 只是作为标识
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
</style>