<style>
</style>
<template>
  <div>
    <date-time @on-change="change" :title="title1"></date-time>
  </div>
</template>
<script>
  import DateTime from '../components/dateTime/index'
  export default {
    data() {
      return {
        title1: '生日'
      }
    },
    components: {
      'date-time': DateTime
    },
    created() {

    },
    methods: {
      change() {

      }
    }
  }
</script>
