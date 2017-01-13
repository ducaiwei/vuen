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
          'http://pic60.nipic.com/file/20150303/12216461_110913232000_2.jpg'
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
