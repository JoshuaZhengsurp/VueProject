<template>
  <div class="ebooksettingfont-wrapper">
    <transition name="slide-up">
      <div
        class="setting-wrapper"
        v-show="menuVisible && settingVisible === 0"
      >
        <!-- 设置字号大小 -->
        <div class="setting-font-size">
          <div
            class="preview"
            :style="{ fontSize : fontSizeList[0].fontSize+'px'}"
          >A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div
                  class="point"
                  v-show="defaultFontSize && defaultFontSize === item.fontSize"
                >
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{ fontSize : fontSizeList[fontSizeList.length-1].fontSize+'px'}"
          >A</div>
        </div>
        <!-- 设置字体样式 -->
        <div
          class="setting-font-family"
          @click="showFontFamilyPopup"
        >
          <div class="setting-font-family-text-wrapper">
            <span class="setting-font-family-text">{{$t('book.selectFont')}}</span>
          </div>
          <div class="setting-font-family-icon-wrapper">
            <span class="iconfont iconright"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { FONT_SIZE_LIST } from '@/utils/book.js'
import { ebookMixin } from '@/utils/mixin.js'
import { saveFontSize } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    // 设置字体大小
    setFontSize (fontSize) {
      this.setDefaultFontSize(fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize + 'px')
      saveFontSize(this.fileName, fontSize)
    },
    // 显示修改字体样式的框框
    showFontFamilyPopup () {
      this.setFontFamilyVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.setting-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  z-index: 200;
  bottom: px2rem(48);
  height: px2rem(90);
  width: 100%;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  background: #c7c7c7;
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #a3a3a5;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid #a3a3a5;
          .point {
            position: absolute;
            top: 50%;
            left: 50%;
            width: px2rem(20);
            height: px2rem(20);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: #c7c7c7;
            box-shadow: px2rem(1) px2rem(4) px2rem(4)
              rgba($color: #000000, $alpha: 0.1);
            @include center;
            .small-point {
              background: #000;
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    @include center;
    font-size: px2rem(14);
    .setting-font-family-icon-wrapper {
      .iconright {
        font-size: px2rem(14);
      }
    }
  }
}
</style>
