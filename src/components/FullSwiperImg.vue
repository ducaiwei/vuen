<style>
.full-img-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.6);
  z-index: -1;
}
.scroller-wrap {
  width: 100%;
  height: 100%;
}
.swipe-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.img-box {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.scroller-wrap div.xs-container {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="full-img-wrap">
    <scroller lock-x :height="wHeight" class="scroller-wrap">
      <swipe class="swipe-box" :autoFlag=false>
        <swipe-item v-for="img in imgs">
          <div :style="{backgroundImage: 'url(' + img + ')'}" class="img-box">
          </div>
        </swipe-item>
      </swipe>
    </scroller>
    <div class="mask"></div>
  </div>
</template>
<script>
  import Swipe from './Swipe.vue'
  import SwipeItem from './SwipeItem.vue'
  import Scroller from './Scroller.vue'
  export default {
    data() {
      return {
        wHeight: window.innerHeight + 'px'
      }
    },
    props: {
      imgs: {
        type:Array,
        default:[]
      }
    },
    components: {
      'scroller': Scroller,
      'swipe': Swipe,
      'swipe-item': SwipeItem
    },
    created() {
    },
    mounted() {
      console.log(this.wHeight);
    }
  }
</script>
