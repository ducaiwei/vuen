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
    <ul class="list-box">
      <li v-for="data in list">
        {{data}}
      </li>
    </ul>
    <!--上拉加载更多内容-->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up pull-up-box" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span v-show="pullupStatus === 'loading'"></span>
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
        pullupStatus: 'default',
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
        },5000)
        setTimeout(() => {
          this.$refs.pullupScroller.pullupReset(uuid);
        },6000)
      },
      changeStatus(val) {
        this.pullupStatus = val;
      }
    }
  }
</script>
