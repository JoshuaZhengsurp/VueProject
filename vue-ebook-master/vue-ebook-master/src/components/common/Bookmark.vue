<template>
  <!-- 滑动页面显示标签 -->
  <div
    class="bookmark"
    ref="bookmark"
    :style="style"
  ></div>
</template>

<script>
import { px2rem } from '../../utils/utils'
export default {
  mounted () {
    this.regresh()
  },
  props: {
    width: Number,
    height: Number,
    color: String
  },
  computed: {
    // 计算bookmark的颜色，返回一个对象
    style () {
      if (this.color) {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    regresh () {
      if (this.width && this.height) {
        this.$refs.bookmark.style.borderWidth = `
        ${px2rem(this.height - 5)}rem 
        ${px2rem(this.width / 2)}rem 
        ${px2rem(5)}rem 
        ${px2rem(this.width / 2)}rem`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.bookmark {
  width: 0;
  height: 0;
  // border-width: px2rem(50) px2rem(7) px2rem(10) px2rem(7);
  border-style: solid;
}
</style>
