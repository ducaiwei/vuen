<style lang="css" scoped>
.container {
  display: block;
}
.list-box {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
}
.list-box li {
  display: block;
  position: relative;
}
.list-box li:after {
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  height: 0;
  border-top: 1px solid #e6e6e6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
.del-box {
  position: absolute;
  display: block;
  width: 1rem;
  height: 1rem;
  color: red;
}
.del-icon {
  position: absolute;
  display: block;
  font-size: .48rem;
  left: .5rem;
  top: 50%;
  margin-top: -.24rem;
  color: red;
  z-index: 99;
}
.tool-box {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  z-index: 0;
}
.tool-box a {
  display: block;
  width: 1rem;
  height: 100%;
  line-height: 100%;
  font-size: .24rem;
  text-decoration: none;
}
.tool-box a.del-btn {
  background-color: red;
  color: #fff;
}
.content-wrap {
  position: relative;
  z-index: 9;
  width: 100%;
  left: 0;
  background-color: #fff;
  transition: all ease-out .5s;
  -webkit-transition: all ease-out .5s;
}
.content-wrap.active {
  left: -100px;
}
.list-box li{
  transition: height ease-out .5s;
  -webkit-transition: height ease-out .5s;
}
li.del {
  height: 0;
}
</style>
<template>
  <div class="container">
    <ul class="list-box">
      <li v-for="data in list" :class="del ? 'del' : ''">
        <div class="content-wrap" :class="flag ? 'active' : ''" @click="tapfn">
          <i class="paco icon-wrong del-icon" @touchend="tapfn($event)"></i>
          <span>data</span>
        </div>
        <div class="tool-box">
          <a href="javaScript:;" class="del-btn" @click="delFn">删除</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [],
        flag: false,
        del: false
      }
    },
    created() {
      for(var i = 0 ;i < 1;i++) {
        this.list.push(i);
      }
    },
    components: {

    },
    mounted() {

    },
    methods: {
      tapfn(event){
        event.preventDefault();
        this.flag = !this.flag;
      },
      delFn(){
        this.del = !this.del;
      }
    }
  }
</script>
