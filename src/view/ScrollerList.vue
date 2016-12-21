<style>
.list-box{
  display: block;
  height: 300px;
}
</style>
<template>
<div>
  <scroller height="100%" lockX scrollbarY="true">
    <ul class="list-box">
      <li v-for="data in list">
        {{data}}
      </li>
    </ul>
  </scroller>
</div>
</template>
<script>
  import Scroller from '../components/Scroller.vue'
  export default {
    name: 'scroller-list',
    data() {
      return {
        list:[]
      }
    },
    created() {
      for(var i = 0 ; i < 50 ;i++) {
        this.list.push(i);
      }
    },
    components: {
      scroller: Scroller
    }
  }
</script>
