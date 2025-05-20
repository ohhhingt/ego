<template>
  <!-- @before-close="handleClose": 
  在对话框关闭之前触发 handleClose 方法 -->
  <el-dialog title="编辑产品" width="70%"
    :visible.sync="dialogEditorVisible" 
    @before-close="handleClose">
    <!-- label-width="70px": 设置表单标签的宽度为 70 像素。 -->
    <!-- :model="editorForm" 存储表单的值 -->
    <!-- ref="editorForm" this.$refs.editorForm 访问到这个表单 -->
    <el-form label-width="70px" :model="editorForm" ref="editorForm">
      <el-form-item label="商品类目">
        <el-button type="primary" class="location"
          @click="dialogCategoryHandle">
          类目选择
        </el-button>
        <span class="tree">
          {{ treeData.name }}
        </span>
        <!-- append-to-body: 这个属性指示对话框应该
        被添加到 body 元素中，而不是其父元素 可能是因为他需要置于顶层 -->
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
        <el-input v-model="editorForm.name" />
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="editorForm.sellPoint" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="editorForm.price" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="editorForm.num" />
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
        <!-- @onEditor="getEditor"是传过来的 -->
        <!-- :currentEditorData="editorData" 是将数据库的信息传过去进行展示 -->
        <ProductWangEditor @onEditor="getEditor" :currentEditorData="editorData" />
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
import ProductBaiduUEditor from './ProductBaiduUEditor.vue'
import ProductTree from './ProductTree.vue'
import ProductUpload from './ProductUpload.vue'
import ProductWangEditor from './ProductWangEditor.vue'

// 编辑对话框
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
      dialogEditorVisible: false,
      // 里面的对话框
      dialogCategoryVisible: false,
      // 图片上传对话框
      dialogUploadVisible: false,
      // 收集添加输入框表单数据
      editorForm: {
        name: '',
        sellPoint: '',
        price: '',
        num: ''
      },
      treeData: {
        // 数据回填的时候 这里面的属性需要写出来
        // 本来整理是没有的
        cid: '',
        name: ''
      }, // 类目选择
      uploadData: {
        // 数据回填的时候 这里面的属性需要写出来
        url: ''
      }, // 存储图片
      editorData: '', //富文本
      currentData: {}
    }
  },
  mounted() {
    // 初始化渲染+请求数据后 数据回填 编辑对话框
    // 监听(接受数据)事件，打开对话框
    this.$bus.$on('onEditorEvent', (row) => {
      this.dialogEditorVisible = true,
      // 通过这种形式把这条数据存起来
      this.currentData = row
      // 获取预更新数据
      this.$api.itemEditorSearch({id:row.id}).then((res) => {
        console.log(res.data)
        // 赋值的过程
        this.treeData.name = res.data.result[0].cid // 类目选择
        this.editorForm.name = res.data.result[0].title
        this.editorForm.sellPoint = res.data.result[0].sellPoint
        this.editorForm.price = res.data.result[0].price
        this.editorForm.num = res.data.result[0].num
        this.uploadData.url = res.data.result[0].image
        this.editorData = res.data.result[0].descs
      })
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

    // 编辑产品
    // 重新提交数据接口
    editorProductHandle() {
        // 使用编辑数据接口
        this.$api.itemEditor({
        id: this.currentData.id,
        cid: this.treeData.cid,
        title: this.editorForm.name,
        sellPoint: this.editorForm.sellPoint,
        price: this.editorForm.price,
        num: this.editorForm.num,
        image: this.uploadData.url,
        desc: this.editorData,
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
</style>