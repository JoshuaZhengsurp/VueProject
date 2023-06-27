<template>
  <div
    class="scroll-wrapper"
    :class="{'no-scroll':ifNoScroll}"
    @scroll.passive="handleScroll"
    ref="scrollWrapper"
  >
    <slot></slot>
  </div>
</template>

<script>
import { realPx } from '../../utils/utils'
export default {
  props: {
    top: {
      // 滚动条距离上方的距离,用来计算滚动条的高度
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    handleScroll (e) {
      if (e && e.target) {
        const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
        this.$emit('onScroll', offsetY)
      }
    },
    scrollTo (x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    // 重新计算高度
    refresh () {
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height =
          window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.scroll-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  // 解决移动端卡顿的问题
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>
