// 这段代码的主要功能是创建一个全局的事件总线，使得 Vue 组件之间
// 可以方便地进行通信。通过在 Vue 原型上添加 $bus 属性，所有组件
// 都可以通过 this.$bus 访问这个事件总线，从而使用 $emit 和 $on 
// 方法来触发和监听事件。
// 以下为固定写法：
import Vue from 'vue'
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return EventBus
        }
    }
})