<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in timerData" :key="index" :class="{ active:nowIndex === index }" @click="timerHandle(item, index)">
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
// 标签组件
export default {
  data() {
    return {
      nowIndex: 0
    }
  },
  props: {
    timerData: {
      type: Array,
      default: function () {
        return [
          {
            value: 'test',
            id: 1
          }
        ]
      }
    }
  },
  methods: {
    timerHandle(item, index) {
      this.nowIndex = index
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}

.chooser-list li {
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}

.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>