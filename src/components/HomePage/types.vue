<template>
    <div class="selection-component">
        <!-- 点击后反选 -->
        <div class="selection-show" @click="showListHandle">
            <span>{{ selecterData[currentIndex].value }}</span>
            <div class="arrow"></div>
        </div>
        <div class="selection-list" v-show="flag">
            <!-- 使用ul li  v-for渲染 -->
            <ul>
                <li v-for="(item, index) in selecterData" :key="index" @click="selectHandle(item, index)">
                    {{ item.value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// 下拉框组件
export default{
 data() {
  return {
    // 一开始为false不显示 下拉框中的东西
    flag: false,
    currentIndex: 0
  }
 },
 props: {
    selecterData: {
        Type: Array,
        default: function() {
            return [
                {
                    value: 'test',
                    id: 0
                }
            ]
        }
    }
 },
 methods: {
    showListHandle() {
        this.flag = !this.flag
    },
    selectHandle(data, index) {
        console.log(data)
        this.currentIndex = index
        // 选择完后将下拉框关闭
        this.flag = false
    }
 }
}
</script>

<style scoped>
.selection-component {
    position: relative;
    display: inline-block;
}

.selection-show {
    border: 1px solid #e3e3e3;
    padding: 0 20px 0 10px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-radius: 3px;
    background: #fff;
}

.selection-show .arrow {
    display: inline-block;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e3e3e3;
    width: 4px;
    height: 0;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
}

.selection-list {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    z-index: 5;
}

.selection-list li {
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.selection-list li:hover {
    background: #e3e3e3;
}
</style>