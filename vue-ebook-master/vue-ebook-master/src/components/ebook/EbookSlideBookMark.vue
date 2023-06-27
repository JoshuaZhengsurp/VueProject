<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">
      {{$t('book.bookmark')}} · {{bookmark?bookmark.length:0}}
    </div>
    <Scroll
      class="slide-bookmark-list"
      :top="48"
      :bottom="48"
    >
      <div
        class="slide-bookmark-item"
        v-for="(item, index) in bookmark"
        :key="index"
        @click="displayBookmark(item.cfi)"
      >
        <div class="slide-bookmark-item-icon">
          <span class="iconfont iconbookmark"></span>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../common/Scroll'
import { getBookmark } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  mounted () {
    this.getBookmark()
  },
  data () {
    return {
      bookmark: null
    }
  },
  methods: {
    getBookmark () {
      this.bookmark = getBookmark(this.fileName)
    },
    displayBookmark (cfi) {
      this.display(cfi, cb => { this.hideTitleAndMenu() })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.ebook-slide-bookmark {
  .slide-bookmark-title {
    font-size: px2rem(16);
    width: 100%;
    height: px2rem(48);
    line-height: px2rem(48);
    padding-left: px2rem(15);
    box-sizing: border-box;
  }
  .slide-bookmark-list {
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .slide-bookmark-item {
      padding: px2rem(10) 0;
      display: flex;
      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(29);
        @include center;
        .iconbookmark {
          @include center;
          width: px2rem(20);
          height: px2rem(20);
          border-radius: 50%;
          background: #bbb;
          font-size: px2rem(16);
        }
      }
      .slide-bookmark-item-text {
        @include ellipsis2(3);
        font-size: px2rem(16);
      }
    }
  }
}
</style>
