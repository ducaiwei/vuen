<style scoped>
  .scroll-bottom {
    width: 100%;
    display: block;
   /* bottom: 0;
    left: 0;
    height: 0;*/
    height: 1px;
    font-size: 0;
  }
  .no-more {
    display: block;
    font-size: .2rem;
    color: #333;
    width: 100%;
    line-height: .4rem;
    text-align: center;
    margin: auto;
  }
</style>
<template>
  <div id="load_more" class="scroll-bottom">
    <slot></slot>
    <div  class="load-more"></div>
    <div v-if="complete" class="no-more">没有更多数据了~</div>
  </div>
</template>
<script>
  function getDistance(elm, dir) {
    let distance;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
    if (dir === 'top') {
      distance = scrollTop;
    } else {
      const styles = getComputedStyle(elm === window ? document.body : elm);
      const innerHeight = elm === window
                        ? window.innerHeight
                        : parseInt(styles.height, 10);
      const scrollHeight = elm === window
                         ? document.body.scrollHeight
                         : elm.scrollHeight;
      const paddingTop = parseInt(styles.paddingTop, 10);
      const paddingBottom = parseInt(styles.paddingBottom, 10);
      distance = scrollHeight - innerHeight - scrollTop - paddingTop - paddingBottom;
    }
    return distance;
  }
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }
  export default {
    props: {
      callback: {
        type: Function,
        default: () => {}
      },
      distance: {
        type: Number,
        default: 100,
      }
    },
    data() {
      return {
        canScroll: true,
        complete: false,
        scrollParent: null
      }
    },
    mounted() {
      this.scrollParent = getScrollParent(this.$el);
      this.$on('scroll:init',() => {
        this.callback();
        this.scrollParent.addEventListener('scroll',this.scrollHandler)
      })
      this.$on('scroll:complete',() => {
        this.complete = true;
        this.scrollParent.removeEventListener('scroll',this.scrollHandler);
      })
    },
    created() {
      this.canScroll = false;
    },
    destroyed() {
    },
    methods: {
      getDistance() {
        var footer = this.$el.querySelector('#load_more');
        var rect = footer.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0
               && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
               && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      },
      changeStatus() {
        document.body.removeEventListener('touchmove',this.changeStatus);
        this.canScroll = true;
        if(this.getDistance()) {
          this.scrollHandler();
        }
      },
      scrollHandler() {
        const currentDistance = getDistance(this.scrollParent, 'bottom');
        if (!this.complete && currentDistance <= this.distance) {
          this.callback();
        }
      }
    }
  }
</script>
