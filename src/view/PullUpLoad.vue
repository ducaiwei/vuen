<style>

</style>
<template>
  <pull-up-load :callback="loadMore">
    <ul class="list-box">
      <li v-for="data in list">
        {{data}}
      </li>
    </ul>
  </pull-up-load>
</template>
<script>
import PullUpLoad from '../components/PullUpLoad.vue'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    for(var i = 0 ; i < 50 ;i++) {
      this.list.push(i);
    }
  },
  components: {
    'pull-up-load': PullUpLoad
  },
  methods: {
    loadMore() {
      setTimeout(() => {
        for(var i = 0 ; i < 50 ;i++) {
          this.list.push(i);
        }
      },500)
    }
  }
}
</script>
