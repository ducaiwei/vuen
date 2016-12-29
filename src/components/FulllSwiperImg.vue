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
          <img src="img">
        </swipe-item>
      </swipe>
    </scroller>
  </div>
</template>
<script>
  import Swipe from 'Swipe'
  import SwipeItem from 'SwipeItem'
  import Scroller from 'Scroller'
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
