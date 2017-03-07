<style lang="scss">
    .pull-down-header {
        width: 100%;
        height: 0;
        overflow: hidden;
        position: relative;
        background-color: #f5f4f9;
        transition: height .2s ease 0s;
    }
    .pull-down-content {
        position: absolute;
        max-width: 90%;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        color: #d5d5d5;
        text-align: center;
        font-size: 14px;
        &--icon {
            float: left;
            margin-top: 10px;
            margin-left: -20px;
            &.pull-down-refresh {
                animation: rotate 2s infinite;
                animation-timing-function: linear;
            }
            &.pull-down-error {
            }
        }
        &--label {
            float: left;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            margin-top: 10px;
        }
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
<template>
    <div class="pull-down-container" >
        <div class="pull-down-header" v-bind:style="{'height': pullDown.height + 'px'}">
            <div class="pull-down-content">
                <span class="pull-down-content--label">{{label}}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    const STATUS_ERROR = -1;
    const STATUS_START = 0;
    const STATUS_READY = 1;
    const STATUS_REFRESH = 2;
    const LABELS = ['网络异常', '下拉刷新数据', '松开刷新数据', '数据刷新中...'];
    const PULL_DOWN_HEIGHT = 60;

    let resetPullDown = pullDown => {
        pullDown.height = 0;
        pullDown.status = STATUS_START;
    };
    export default {
        props: {
            onRefresh: {
                type: Function
            },
            config: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
                pullDown: {
                    status: 0,
                    height: 0,
                    msg: ''
                },
                top: 0,
                scrollEventTarget: ''
            };
        },
        methods: {
          getScrollTop(element) {
            if (element === window) {
              return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
              return element.scrollTop;
            }
          },
          getScrollEventTarget(element) {
              let currentNode = element;
              while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                  return currentNode;
                }
                currentNode = currentNode.parentNode;
              }
              return window;
          },
        },
        computed: {
            label() {
                if (this.pullDown.status === STATUS_ERROR) {
                    return this.pullDown.msg;
                }
                return this.customLabels[this.pullDown.status + 1];
            },
            customLabels() {
                let errorLabel = this.config.errorLabel || LABELS[0];
                let startLabel = this.config.startLabel || LABELS[1];
                let readyLaebl = this.config.readyLabel || LABELS[2];
                let loadingLabel = this.config.loadingLabel || LABELS[3];
                return [errorLabel, startLabel, readyLaebl, loadingLabel];
            },
            iconClass() {
                if (this.pullDown.status === STATUS_REFRESH) {
                    return 'pull-down-refresh';
                } else if (this.pullDown.status === STATUS_ERROR) {
                    return 'pull-down-error';
                }
                return '';
            }
        },
        mounted() {
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            this.$nextTick(() => {
                var el = this.$el;
                var pullDownHeader = el.querySelector('.pull-down-header');
                var icon = pullDownHeader.querySelector('.pull-down-content--icon');
                this.top = el.getBoundingClientRect().top;
                var touchPosition = {
                    start: 0,
                    distance: 0,
                    startTime: 0
                };
                el.addEventListener('touchstart', e => {
                    touchPosition.start = e.touches.item(0).pageY;
                    touchPosition.distance = 0;
                    touchPosition.startTime = new Date().getTime();
                });
                el.addEventListener('touchmove', e => {
                    var distance = e.touches.item(0).pageY - touchPosition.start;
                    if(distance > 0 && this.getScrollTop(this.scrollEventTarget) == 0) {
                        e.preventDefault();
                        distance = distance > 180 ? 180 : distance;
                        touchPosition.distance = distance;
                        this.pullDown.height = distance;
                        if (distance > PULL_DOWN_HEIGHT) {
                            this.pullDown.status = STATUS_READY;
                        } else {
                            this.pullDown.status = STATUS_START;
                        }
                    }
                });
                el.addEventListener('touchend', e => {
                    var distTime = new Date().getTime() - touchPosition.startTime;
                    if (distTime > 300 && touchPosition.distance > PULL_DOWN_HEIGHT) {
                        if(this.getScrollTop(this.scrollEventTarget) == 0){
                            this.pullDown.height = PULL_DOWN_HEIGHT;
                            this.pullDown.status = STATUS_REFRESH;
                          if (this.onRefresh && typeof this.onRefresh === 'function') {
                              var res = this.onRefresh();
                              if (res && res.then && typeof res.then === 'function') {
                                  res.then(result => {
                                      resetPullDown(this.pullDown);
                                  }, error => {
                                      this.pullDown.msg = error || this.customLabels[0];
                                      this.pullDown.status = STATUS_ERROR;
                                      setTimeout(() => {
                                          resetPullDown(this.pullDown);
                                      }, 1000);
                                  });
                              } else {
                                  resetPullDown(this.pullDown);
                              }
                          } else {
                              resetPullDown(this.pullDown);
                          }
                        }
                    } else {
                        resetPullDown(this.pullDown);
                    }
                    touchPosition.distance = 0;
                    touchPosition.start = 0;
                });
            });
        }
    };
</script>

