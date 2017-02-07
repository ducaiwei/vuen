<style>
  .date-time {
    font-size: .5rem;
    text-decoration: none;
  }
  .time {
    font-size: 14px;
    color: #333;
  }
  .left-text {
    text-align: left;
  }
  .date-time-box {
    position: relative;
    width: 100%;
  }
  .date-time-box:after {
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
    <date-time @on-change="change" class="date-time" v-model="time1" :minYear=1900 :maxYear=2030>
        <div class="date-time-box">
          <span class="time left-text">选择预约时间</span>
          <span class="time">{{time1}}</span>
        </div>
    </date-time>
    <date-time class="date-time" v-model="time2" :minYear=1900 :maxYear=2030 format="YYYY-MM-DD HH">
        <div class="date-time-box">
          <span class="time left-text">选择预约时间</span>
          <span class="time">{{time2}}</span>
        </div>
    </date-time>
  </div>
</template>
<script>
  import DateTime from '../components/dateTime/index'
  export default {
    data() {
      return {
        title1: '生日',
        time1: '1989-06-27',
        time2: '2017-02-07 09'
      }
    },
    components: {
      'date-time': DateTime
    },
    created() {
    },
    methods: {
      change(val) {
      }
    }
  }
</script>
