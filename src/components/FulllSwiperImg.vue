<style>
.full-img-wrap {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="full-img-wrap">
    <scroller lock-x>
      <swipe>
        <swipe-item v-for="img in imgs">
          <div :style="{backgroundImage: 'url(' + img + ')'}">
          </div>
        </swipe-item>
      </swipe>
    </scroller>
  </div>
</template>
<script>
  import Swipe from './Swipe.vue'
  import SwipeItem from './SwipeItem.vue'
  import Scroller from './Scroller.vue'
  export default {
    props: {
      imgs: {
        type:Array,
        default:[
          '',
          '',
          ''
        ]
      }
    },
    components: {
      'scroller': Scroller,
      'swipe': Swipe,
      'swipe-item': SwipeItem
    }
  }
</script>
