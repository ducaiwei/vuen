<style scoped="">
  .dp-one {

  }
</style>
<template>
  <div>
    <div class="dp-one">

    </div>
  </div>
</template>
<script>
  import Picker from './pickerselect.js'
  import Scroller from '../picker/scroller'
  export default {
    props: {
      cascade: {//级联层数
        type: Number,
        default: 1
      },
      defaultValue: {//默认选中
        type: Array,
        default: [0]
      },
      data: {//需要渲染的数据
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        currentValue: [0],
        uuid: new Date().getTime()
      }
    },
    created() {
      this.currentValue = this.defaultValue
    },
    mounted() {
      const uuid = this.uuid
      this.$nextTick(() => {
        this.$el.setAttribute('id', 'vux-datetime-' + uuid)
        this.render()
      })
    }
  }
</script>
