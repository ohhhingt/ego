<template>
    <!-- 图片上传 后端会给一个接口 不需要前端配置api 常规配置无效 -->
    <!-- 图片上传一定给的是单独的地址，而且跨域是后台解决的 -->
    <!-- 上传之后在项目根目录生成 upload 文件夹 下面就有图片 -->
    <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3000/api/upload"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="handleSuccess"
    >
        <el-button slot="trigger" size="small" type="primary">
            选择文件
        </el-button>
        <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >
            上传到服务器
        </el-button>
         <div slot="tip" class="el-upload__tip">目前仅支持单张图片上传</div>
    </el-upload>
</template>

<script>
export default{
 data() { 
  return {
    fileList: []
  }
 },
 methods: {
    handleSuccess(response) {
        console.log(response)
    },
    submitUpload() {
        this.$refs.upload.submit()
    }
 }
}
</script>

<style>

</style>