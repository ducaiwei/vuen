<style lang="css" scoped>
html,body {
  width: 100%;
  height: 100%;
}
li.menu-li{
  position: relative;
  height: 1rem;
  text-align: left;
  padding: 0;
  margin: 0;
}
.menu-li{
  display: block;
  padding-left: .2rem;
  font-size: .28rem;
  line-height: 1rem;
  text-decoration: none;
  color: #333;
}
li.menu-li:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
  border-top: 1px solid #e6e6e6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
</style>
<template>
  <div>
    <ul>
      <li class="menu-li" @touchend="skip('setList')">可修改列表
      </li>
      <li class="menu-li" @touchend="skip('pullUpLoad')">pullUpLoad
      </li>
      <li class="menu-li" @touchend="skip('fullImg')">查看大图
      </li>
      <li class="menu-li" @touchend="skip('canvasImage')">canvas</li>
      <li class="menu-li" @touchend="skip('dateTime')">时间选择器</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'index',
    methods: {
      skip(path) {
        this.$router.push(path);
      }
    }
  }
</script>
