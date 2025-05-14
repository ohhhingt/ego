<template>
  <div class="index-board-list">
    <!-- {'line-last':index%2 !==0} 
    只有index % 2 !== 0 为 true 时 才会被添加到元素的类中
    奇数，类会被添加；如果是偶数，则不会添加
    取余后为0就是偶数 不会添加 -->
    <div class="index-board-item" 
      v-for="(item, index) in buyData" 
      :key="index" 
      :class="['index-board-' + item.url, 
      {'line-last':index%2 !== 0}]">
      <div class="index-board-item-inner">
        <img class="index-img" :src="item.imgsrc" alt="图标">
        <div class="option">
          <h2>{{ item.title }}</h2>
          <p>{{ item.desc }}</p>
          <div class="index-board-button">
            <!-- 中间这个拼接字符串 可以点击对应选项 
                跳转到details下对应的页面 -->
            <router-link :to="'/details/'+item.url" class="button">立即购买</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyData: [
        {
          title: '开放产品',
          desc: '开放产品开放产品开放产品',
          // 设置类名、跳转
          url: 'openproduct',
          // 为什么这里要用require引入图片 因为这样可以直接打包到dist目录下
          imgsrc: require('@/assets/开放产品.webp')
        },
        {
          title: '品牌营销',
          desc: '品牌营销品牌营销品牌营销',
          url: 'logo',
          imgsrc: require('@/assets/品牌营销.webp')
        },
        {
          title: '使命必达',
          desc: '使命必达使命必达使命必达',
          url: 'golife',
          imgsrc: require('@/assets/使命必达.webp')
        },
        {
          title: '勇攀高峰',
          desc: '勇攀高峰勇攀高峰勇攀高峰',
          url: 'heigh',
          imgsrc: require('@/assets/勇攀高峰.webp')
        }
      ]
    }
  }
}
</script>

<style scoped>
.index-board-list {
  overflow: hidden;
  margin-top: 15px;
}

.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.index-board-item-inner {
  min-height: 125px;
  display: flex;
}

.index-img {
  width: 100px;
  height: 100px;
}

.option {
    flex: 1;
}

.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}

.line-last {
  margin-right: 0;
}

.index-board-button {
  margin-top: 20px;
}

.lastest-news {
  min-height: 350px;
}

.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
</style>