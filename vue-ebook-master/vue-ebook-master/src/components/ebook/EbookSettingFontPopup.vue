<template>
  <transition name="popup-slide-up">
    <div
      class="ebook-popup-list"
      v-show="fontFamilyVisible"
    >
      <div class="ebook-popup-title">
        <div
          class="ebook-popup-title-icon"
          @click="hide"
        >
          <span class="iconfont icondown"></span>
        </div>
        <span class="ebook-popup-title-text">
          {{$t('book.selectFont')}}
        </span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div
            class="ebook-popup-item-text"
            :class="{'selected':isSelected(item)}"
          >{{item.font}}</div>
          <div
            class="ebook-popup-item-check"
            v-show="isSelected(item)"
          >
            <span class="iconfont iconyes"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '@/utils/mixin.js'
import { FONT_FAMILY_LIST } from '@/utils/book'
import { saveFontFamily } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontFamilyList: FONT_FAMILY_LIST
    }
  },
  methods: {
    // 隐藏字体选择框
    hide () {
      this.setFontFamilyVisible(false)
    },
    // 字体是否被选择
    isSelected (item) {
      return this.defaultFontFamily === item.font
    },
    // 点击字体名称，切换字体
    setFontFamily (font) {
      this.setDefaultFontFamily(font)
      this.currentBook.rendition.themes.font(font)
      saveFontFamily(this.fileName, font)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.ebook-popup-list {
  z-index: 203;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  background: #c0c0c0;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba($color: #000000, $alpha: 0.1);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    border-bottom: 1px solid #9a9a9a;
    box-sizing: border-box;
    text-align: center;
    @include center;
    height: px2rem(38);
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    overflow: hidden;
    .ebook-popup-item {
      display: flex;
      padding: px2rem(8) px2rem(15);
      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(20);
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        font-size: px2rem(22);
        text-align: right;
        font-weight: bold;
        .iconyes {
          color: #346cb9;
        }
      }
    }
  }
}
</style>
