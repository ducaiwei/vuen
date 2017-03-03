<style scoped>
  .list-img {
    display: block;
    width: 1rem;
    height: 1rem;
  }
</style>
<template>
  <div>
      <img :src="img" v-for="img in imgs" class="list-img" @touchend="show">
      <full-swipe-img :imgs="imgs" ref="fullImg"></full-swipe-img>
  </div>
</template>
<script>
  import FullSwipeImg from '../components/FullSwiperImg.vue'
  export default {
    data() {
      return {
        imgs:[
          'http://pic56.nipic.com/file/20141227/19674963_215052431000_2.jpg',
          'http://imgstore.cdn.sogou.com/app/a/100540002/548664.jpg',
          'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1486457858&di=43fce844ba62a044d25b60e95f8360d0&src=http://p2.qhimg.com/t011fc13354f12d1a46.jpg'
        ]
      }
    },
    components: {
      'full-swipe-img': FullSwipeImg
    },
    methods: {
      show() {
        this.$refs.fullImg.show();
      }
    }
  }
</script>
