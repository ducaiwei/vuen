<template>
  <div :style="styles">
    <div class="xs-container">
      <slot></slot>
      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
  </div>
</template>

<script>
import XScroll from 'vux-xscroll/build/cmd/xscroll.js'
import Pulldown from 'vux-xscroll/build/cmd/plugins/pulldown'
import Pullup from 'vux-xscroll/build/cmd/plugins/pullup'

const pulldownDefaultConfig = () => ({
  content: '下拉刷新',
  height: 60,
  autoRefresh: false,
  downContent: '下拉刷新',
  upContent: '释放刷新',
  loadingContent: '加载中...',
  clsPrefix: 'xs-plugin-pulldown-'
})

const pullupDefaultConfig = () => ({
  content: '上拉加载更多',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: '释放刷新',
  upContent: '上拉加载更多',
  loadingContent: '加载中...',
  clsPrefix: 'xs-plugin-pullup-'
})

export default {
  props: {
    height: String,
    lockX: Boolean,
    lockY: Boolean,
    scrollbarX: Boolean,
    scrollbarY: Boolean,
    bounce: {
      type: Boolean,
      default: true
    },
    useOriginScroll: {
      type: Boolean,
      default: false
    },
    useTransition: {
      type: Boolean,
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: true
    },
    stopPropagation: Boolean,
    boundryCheck: {
      type: Boolean,
      default: true
    },
    gpuAcceleration: {
      type: Boolean,
      default: true
    },
    usePulldown: {
      type: Boolean,
      default: false
    },
    usePullup: {
      type: Boolean,
      default: false
    },
    pulldownConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pullupConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pulldownStatus: {
      type: String,
      default: 'default'
    },
    pullupStatus: {
      type: String,
      default: 'default'
    },
    enableHorizontalSwiping: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reset (scrollPosition) {
      if (scrollPosition) {
        if (typeof scrollPosition.left !== 'undefined') {
          this._xscroll.scrollLeft(scrollPosition.left)
        }
        if (typeof scrollPosition.top !== 'undefined') {
          this._xscroll.scrollTop(scrollPosition.top)
        }
      }
      setTimeout(() => {
        this._xscroll && this._xscroll.render()
      })
    },
    pullupReset(uuid) {
      this.pullupStatus = 'default'
      if (uuid === this.uuid) {
        this.pullup.complete()
        this.reset()
      }
    },
    pulldownReset(uuid) {
      this.$emit('changeStatus','default');
      if (uuid === this.uuid) {
        this.pulldown.reset(() => {
          this.reset()
        })
      }
    },
    pullupDone(uuid) {
      if (uuid === this.uuid) {
        this._xscroll.unplug(this.pullup)
      }
    },
    pullupDisable(uuid) {
      if (uuid === this.uuid) {
        this.pullup.stop()
      }
    },
    pullupEnable(uuid) {
      if (uuid === this.uuid) {
        this.pullup.restart()
      }
    }
  },
  created () {
    this.uuid = Math.random().toString(36).substring(3, 8)
  },
  computed: {
    styles () {
      if (!this.height && !this.$el.style.height && this.lockX) {
        this.height = `${document.documentElement.clientHeight}px`
        this.reset()
      }

      if (this.height && this.height.indexOf('-') === 0) {
        this.height = `${document.documentElement.clientHeight + parseInt(this.height)}px`
      }

      return {
        'max-height': `${this.height}`
      }
    }
  },
  mounted () {
    this.$el.setAttribute('id', `vux-scroller-${this.uuid}`)
    let content = null
    const slotChildren = this.$el.querySelector('.xs-container').childNodes
    for (let i = 0; i < slotChildren.length; i++) {
      if (slotChildren[i].nodeType === 1) {
        content = slotChildren[i]
        break
      }
    }
    if (!content) {
      throw new Error('no content is found')
    }
    this._xscroll = new XScroll({
      renderTo: `#vux-scroller-${this.uuid}`,
      lockX: this.lockX,
      lockY: this.lockY,
      scrollbarX: this.scrollbarX,
      scrollbarY: this.scrollbarY,
      content: content,
      bounce: this.bounce,
      useOriginScroll: this.useOriginScroll,
      useTransition: this.useTransition,
      preventDefault: this.preventDefault,
      boundryCheck: this.boundryCheck,
      gpuAcceleration: this.gpuAcceleration,
      stopPropagation: this.stopPropagation
    })
    if (this.usePulldown) {
      let container = this.$el.querySelector('div[slot="pulldown"]')
      let config = Object.assign(pulldownDefaultConfig(), this.pulldownConfig)
      if (container) {
        config.container = container
      }
      this.pulldown = new Pulldown(config)
      this._xscroll.plug(this.pulldown)
      this.pulldown.on('loading', (e) => {
        this.$emit('pulldown:loading', this.uuid)
      })
      this.pulldown.on('statuschange', (val) => {
        this.pulldownStatus = val.newVal
      })
    }

    if (this.usePullup) {
      let container = this.$el.querySelector('div[slot="pullup"]')
      let config = Object.assign(pullupDefaultConfig(), this.pullupConfig)

      if (container) {
        config.container = container
      }
      this.pullup = new Pullup(config)
      this._xscroll.plug(this.pullup)
      this.pullup.on('loading', (e) => {
        this.$emit('pullup:loading', this.uuid)
      })
      this.pullup.on('statuschange', (val) => {
        this.$emit('changeStatus',val.newVal);
      })
    }

    if (this.enableHorizontalSwiping) {
      this._xscroll.on('panstart', (e) => {
        if (e.direction === 2 || e.direction === 4) {
          e.preventDefault()
          if (this.scrollbarY) {
            this._xscroll.userConfig.scrollbarY = false
          }
          this._xscroll.userConfig.lockY = true
        }
      })
      this._xscroll.on('panend', () => {
        if (this.scrollbarY) {
          this._xscroll.userConfig.scrollbarY = true
        }
        this._xscroll.userConfig.lockY = false
      })
    }

    this._xscroll.render()
  },
  events: {
    'scroller:reset' (uuid) {
      if (uuid === this.uuid) {
        this.reset()
      }
    }
  },
  beforeDestroy () {
    if (this.pullup) {
      this._xscroll.unplug(this.pullup)
      this.pullup.pluginDestructor()
    }
    if (this.pulldown) {
      this._xscroll.unplug(this.pulldown)
      this.pulldown.pluginDestructor()
    }
    this._xscroll.destroy()
    this._xscroll = null
  }
}
</script>

<style>
.xs-plugin-pullup-container {
  text-align: center;
}
</style>
