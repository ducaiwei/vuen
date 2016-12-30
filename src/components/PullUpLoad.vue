<style>
.list-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.list-box{
  display: block;
  height: 100%;
}
.list-box li {
  display: block;
  font-size: .24rem;
  height: .6rem;
  line-height: .6rem;
}
.pull-up-box span{
  font-size: .24rem;
}
</style>
<template>
<div class="list-wrap">
  <scroller lockX :height="defaultHeight" use-pullup
      @changeStatus="changeStatus" @pullup:loading="loadMore" ref="pullupScroller">
      <slot></slot>
    <!--上拉加载更多内容-->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up pull-up-box" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span v-show="pullupStatus === 'loading'"></span>
    </div>
  </scroller>
</div>
</template>
<script>
  import Scroller from './Scroller.vue'
  export default {
    props: ['height','callback'],
    name: 'scroller-list',
    data() {
      return {
        pullupStatus: 'default',
        list:[],
        defaultHeight: this.height || window.innerHeight + 'px'
      }
    },
    created() {
    },
    computed:{

    },
    components: {
      scroller: Scroller
    },
    methods: {
      loadMore(uuid) {
        if(this.callback && typeof this.callback == Function){
          this.callback().call();
        }
        setTimeout(() => {
          this.$refs.pullupScroller.pullupReset(uuid);
        },500)
      },
      changeStatus(val) {
        this.pullupStatus = val;
      }
    }
  }
</script>
