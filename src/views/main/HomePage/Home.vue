<template>
  <div class="home">
    <div class="index-wrap">
      <div class="index-left">
        <HomeNav />
      </div>
      <div class="index-right">
        <HomeSwiper />
        <HomeProductList />
      </div>
    </div>
  </div>
</template>

<script>
import HomeNav from './HomeNav'
import HomeSwiper from './HomeSwiper'
import HomeProductList from './HomeProductList'
export default {
  name: 'Home',
  components: {
    HomeNav,
    HomeSwiper,
    HomeProductList
  }
}
</script>

<style scoped lang="less">
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.index-left {
  float: left;
  width: 300px;
  text-align: left;
}

.index-right {
    float: left;
    width: 900px;
    // background-color: pink;
}
</style>