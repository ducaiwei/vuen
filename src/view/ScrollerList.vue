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
</style>
<template>
<div class="list-wrap">
  <scroller lockX :height="defaultHeight" use-pullup @pullup:loading="loadMore" ref="pullupScroller">
    <ul class="list-box">
      <li v-for="data in list">
        {{data}}
      </li>
    </ul>
    <!--上拉加载更多内容分发-->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'">上拉加载更多</span>
        <span v-show="pullupStatus === 'loading'">正在加载中...</span>
    </div>
  </scroller>
</div>
</template>
<script>
  import Scroller from '../components/Scroller.vue'
  export default {
    props: ['height'],
    name: 'scroller-list',
    data() {
      return {
        list:[],
        defaultHeight: this.height || window.innerHeight + 'px'
      }
    },
    created() {
      for(var i = 0 ; i < 50 ;i++) {
        this.list.push(i);
      }
    },
    computed:{
      pullupStatus() {
        return this.$refs.pullupScroller && this.$refs.pullupScroller.pullupStatus || 'default';
      }
    },
    components: {
      scroller: Scroller
    },
    methods: {
      loadMore(uuid) {
        setTimeout(() => {
          for(var i = 50 ; i < 60 ;i++) {
            this.list.push(i);
          }
        },1000)
        setTimeout(() => {
          this.$refs.pullupScroller.pullupReset(uuid);
        },10)
      }
    }
  }
</script>
