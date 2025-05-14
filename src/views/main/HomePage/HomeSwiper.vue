<template>
  <div class="swiper-size">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in bannerImg" :key="index">
        <img class="swiperimg" :src="slide" alt="">
      </swiper-slide>
      <!-- 分页指示器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 前进后退按钮 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import 'swiper/swiper-bundle.css'; // 确保引入样式  

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return { 
      // 在这里添加你的 swiper 配置选项  
      swiperOption: {
        // 配置分页指示器的元素
        pagination: {
          el: '.swiper-pagination',
        },
        // 启用自动播放功能
        autoplay: true,
        // 配置前进和后退按钮的元素。
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true
      },
      // 图片
      bannerImg: [
        require('../../../assets/slideShow/超级秒杀日.png'),
        require('../../../assets/slideShow/大会买.png'),
        require('../../../assets/slideShow/净时省力趣生活.png'),
        require('../../../assets/slideShow/12期免息.png'),
      ]
    }
  },
  //   methods: {
  //     logBannerImages() {
  //       console.log(this.bannerImg); // 输出 bannerImg 数组到控制台  
  //     }
  //   },
  //   mounted() {
  //     this.logBannerImages(); // 在组件挂载后调用方法  
  //   }
}
</script>

<style scoped>
.swiperimg {
  width: 100%;
  height: 350px;
}

.swiper-size {
  margin-top: 15px;
}
</style>