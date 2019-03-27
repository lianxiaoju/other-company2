<template>
  <div ref="scrollContainer" class="scroll-container" @wheel.prevent="handleScroll">
    <div class="tags-prev-next">
      <i class="iconfont icon-icon_arrow-submenu prev" @click="handleScroll('prev')"></i>
      <i class="iconfont icon-icon_arrow-submenu next" @click="handleScroll('next')"></i>
    </div>
    <div ref="scrollWrapper" :style="{left: left + 'px'}" class="scroll-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
const padding = 15 // tag's padding

export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0
    }
  },
  methods: {
    handleScroll(e) {
      let eventDelta = 0
      if(e == 'prev'){
        eventDelta = 120
      }else if(e == 'next'){
        eventDelta = -120
      }else{
        eventDelta = e.wheelDelta || -e.deltaY * 3
      }
      // const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        console.log(e)
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        console.log(e)
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/variables.less";
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
    padding-right: 60px;
  }
  .tags-prev-next{
    width: 60px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background: #fff;
    display: flex;
    box-shadow: -14px 0px 14px -3px #eee;
    i{
      flex: 1;
      cursor: pointer;
      text-align: center;
      position: relative;
      color: #DBDBDB;
      &:hover{
        color: @baseColor
      }
      &.prev{
        transform: rotateZ(180deg);
        &:before{
          top: -3px
        }
      }
      &:before{
        position: absolute;
        top: 0;
        right: 15px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
