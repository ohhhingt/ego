<template>
    <div>
        <!-- loadNode是一个方法 -->
        <!-- 将 defaultProps 数据绑定到树形组件的
        属性上，定义树节点的结构。 -->
        <!-- @node-click="handleNodeClick"：当节点被点击时，
        调用 handleNodeClick 方法 -->
        <!-- lazy 属性表示树节点是懒加载的，只有在需要时才会加载子节点 -->
        <el-tree :props="defaultProps"
        :load="loadNode"
        @node-click="handleNodeClick" lazy></el-tree>
    </div>
</template>

<script>
// 类目选择
export default{
 data() {
      return {
        data: [],
        defaultProps: {
            // 节点的字段名
            children: 'children',
            // 节点名称的字段名
            label: 'name'
        }
      };
    },
    methods: {
      // 当节点被点击时调用，打印被点击的节点数据
      handleNodeClick(data) {
        // console.log(data);
        this.$emit('onTree', data)
      },
      // 加载树节点数据的方法
      loadNode(node, resolve) {
        // 第一层数据 判断当前节点是否为第一层
        if (node.level === 0) {
            // 调用 API selectItemCategoryByParentId 获取第一层数据
            this.$api.selectItemCategoryByParentId().then(res => {
            // 如果请求成功且状态为 200，调用 resolve 
            // 返回结果；否则返回空数组
            if (res.data.status === 200) {
                return resolve(res.data.result)
            } else {
                return resolve([])
            }
        }).catch(err => {  
        console.error(err); // 处理错误  
        resolve([]); // 返回空数组  
      });
        }
        // 后续展开数据 判断当前节点是否为后续层节点
        if (node.level >= 1) {
            console.log(node)
            // 重新请求数据
            this.$api.selectItemCategoryByParentId({
                // 用对应的cid请求
                id: node.data.cid
            }).then(res => {
            if (res.data.status === 200) {
                return resolve(res.data.result)
            } else {
                return resolve([])
            }
            // 不是第一层 返回空数组
            }).catch(err => {
                resolve([])
            })
        }else {  
      resolve([]); // 如果不是第一层或后续层，返回空数组  
    }  
      }
    }
}
</script>

<style>

</style>