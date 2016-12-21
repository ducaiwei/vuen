<template>
  <div id="app">
      <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      transitionName: 'slide'
    }
  }
}
</script>

<style>
@import './assets/normalize.css';
html,body {
  margin: 0;
}
body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
ul {
  margin: 0;
  padding: 0;
}
ul li{
  display: block;
  list-style: none;
}
.slide-enter-active,.slide-leave-active {
  transition: left .5s;
  -webkit-transition: left .5s;
}
.slide-enter,.slide-leave-active {
  left: 100%;
}
</style>
