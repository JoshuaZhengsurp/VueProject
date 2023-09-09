<template>
<!-- 阅读器，所有与阅读器相关的组件都挂载到这里 -->
  <div
    class="ebook"
    ref="ebook"
  >
    <EbookHeader></EbookHeader>
    <EbookFooter></EbookFooter>
    <EbookReader></EbookReader>
    <EbookMenu></EbookMenu>
    <EbookTitle></EbookTitle>
    <EbookBookmark></EbookBookmark>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookBookmark from '../../components/ebook/EbookBookmark'
import EbookHeader from '../../components/ebook/EbookHeader'
import EbookFooter from '../../components/ebook/EbookFooter'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
export default {
  components: { EbookReader, EbookTitle, EbookMenu, EbookBookmark, EbookHeader, EbookFooter },
  mixins: [ebookMixin],
  mounted () {
    this.startLoopReadTime()
  },
  watch: {
    offsetY (v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  },
  beforeDestroy () {
    if (this.task) {
      // 终止定时任务
      clearInterval(this.task)
    }
  },
  methods: {
    // 统计每本书的阅读时间
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        // 第一次阅读此图书，阅读时间初始化为0,单位秒
        readTime = 0
      }
      this.task = setInterval(() => {
        // 定时任务,每1000ms,readTime ++
        readTime++
        // 当readTime = 30的倍数，即半分钟，每半分钟保存一次阅读时间
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () {
      this.$refs.ebook.style.top = 0 + 'px'
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.ebook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
