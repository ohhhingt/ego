<template>
    <div ref="editorWang" style="text-align:left;">
        
    </div>
</template>

<script>
import wangEditor from 'wangeditor'
export default{
 data() {
  return {
    editor: null, // editor对象
    editorData: '' // 承载编辑器对象
  }
 },
 mounted() {
    this.editor = new wangEditor(this.$refs.editorWang);
    // 配置 onchange 回调函数， 将数据同步到 Vue 中
    this.editor.config.onchange = (newHtml) => {
        // 输入的东西会打印到控制台
        // console.log(newHtml);
        this.editorData = newHtml;
        // console.log(this.editorData)
        this.$emit('onEditor', this.editorData)
    }

    // 自定义菜单配置
    this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
    ]

    this.editor.create(); // 常见编辑器
 },
 beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null
 }
}
</script>

<style>

</style>