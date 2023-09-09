<template>
  <!-- 下拉显示的背景层 -->
  <div
    class="ebook-bookmark"
    ref="bookmark"
  >
    <div class="ebook-bookmark-text-wrapper">
      <div
        class="ebook-bookmark-down-wrapper"
        ref="iconDown"
      >
        <span class="iconfont icondown1"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div
      class="ebook-bookmark-icon-wrapper"
      :style="isFixed ? fixedStyle : {}"
    >
      <Bookmark
        :color="color"
        :width="15"
        :height="35"
      ></Bookmark>
    </div>
  </div>
</template>

<script>
import { realPx } from '../../utils/utils'
import { getBookmark, saveBookmark } from '../../utils/localStorage'
import Bookmark from '../common/Bookmark'
import { ebookMixin } from '../../utils/mixin'
const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
  components: {
    Bookmark
  },
  mixins: [ebookMixin],
  computed: {
    heigth () {
      return realPx(35)
    },
    threshold () {
      // threshold:临界值、阈值
      return realPx(55)
    },
    fixedStyle () {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}`
      }
    }
  },
  watch: {
    offsetY (v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.heigth && v <= this.threshold) {
        // 状态2：未到达临界状态
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        // 状态3：到达临界状态
        this.afterThreshold(v)
      } else if (v > 0 && v <= this.heigth) {
        this.beforeHeight()
      } else if (v === 0) {
        this.restore()
      }
    },
    isBookmark (isBookmark) {
      if (isBookmark) {
        this.color = BLUE
      } else {
        this.color = WHITE
      }
      this.isFixed = isBookmark
    }
  },
  data () {
    return {
      text: '',
      color: BLUE,
      isFixed: false
    }
  },
  methods: {
    restore () {
      // 状态四，归位
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.heigth}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    // 第一阶段，未到达指定高度
    beforeHeight () {
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    // 到达临界状态前，第二阶段
    beforeThreshold (v) {
      this.$refs.bookmark.style.top = `${-v}px`
      const iconDown = this.$refs.iconDown
      this.beforeHeight()
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    // 到达临界状态后，第三阶段
    afterThreshold (v) {
      this.$refs.bookmark.style.top = `${-v}px`
      const iconDown = this.$refs.iconDown
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      if (iconDown.style.transform === '' ||
        iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    },
    // 添加书签
    addBookmark () {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cifbase = currentLocation.start.cfi.replace(/!.*/, '')
      const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
      const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
      const cfirange = `${cifbase}!,${cfistart},${cfiend})`
      this.currentBook.getRange(cfirange).then(range => {
        // replace是为了消除空格(/s/s两个空格以上，正常英文单词间隔1个空格)
        const text = range.toString().replace(/\s\s/g, '')
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text: text
        })
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    // 删除书签
    removeBookmark () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    bottom: 0;
    right: px2rem(45);
    display: flex;
    .ebook-bookmark-down-wrapper {
      transition: all 0.2s linear;
      @include center;
      .icondown1 {
        font-size: px2rem(14);
        color: #fff;
        margin-right: px2rem(5);
      }
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: #fff;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
    .icon {
      width: 0;
      height: 0;
      border-width: px2rem(50) px2rem(7) px2rem(10) px2rem(7);
      border-style: solid;
      border-color: #00f #00f transparent #00f;
    }
  }
}
</style>
