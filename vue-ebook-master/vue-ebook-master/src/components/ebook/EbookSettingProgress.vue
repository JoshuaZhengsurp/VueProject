<template>
  <transition name="slide-up">
    <div
      class="setting-wrapper"
      v-if="menuVisible && settingVisible === 2"
    >

      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="iconfont iconright"></span>
        </div>
        <div class="progress-wrapper">
          <div
            class="progress-icon-wrapper"
            @click="prevSection()"
          >
            <span class="iconfont iconleft"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          >
          <div
            class="progress-icon-wrapper"
            @click="nextSection()"
          >
            <span class="iconfont iconright"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%':'加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  computed: {
  },
  updated () {
    if (this.$refs.progress) {
      this.$refs.progress.style.cssText = `background-size:${this.progress}% 100% !important;`
    }
  },
  methods: {
    onProgressChange (progress) {
      // progress是进度条百分比，0-100
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput (progress) {
      // 进度条中的小圆圈以移动(progress改变)，就会触发此事件
      // 点击移动进度条，送手后，才会触发onProgressChange()事件
      this.setProgress(progress).then(() => {
        this.updateProgressBg()
      })
    },
    // 滑动进度条后，跳转到指定百分比页面
    displayProgress () {
      // cfi是跳转所需要的东西
      const cfi = this.currentBook.locations.cfiFromPercentage(
        this.progress / 100)
      this.display(cfi)
    },
    // 更新进度条，使已读部分和未读部分产生样式差异
    updateProgressBg () {
      // 背景色变化，样式已经写好，更改background-size即可
      this.$refs.progress.style.cssText = `background-size:${this.progress}% 100% !important;`
    },
    // 跳转到上一章节
    prevSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      } else if (this.section === 0) {
        this.simpleToast(this.$t('book.frontToast'))
      }
    },
    // 跳转到下一章节
    nextSection () {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      } else if (this.section === this.currentBook.spine.length - 1) {
        this.simpleToast(this.$t('bool.behindToast'))
      }
    },
    // 点击章节跳转后，进行章节的跳转
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        // BUG section的值，大目录两个(目录中没有目录和作者信息，section里有他们)
        // console.log(this.navigation)
        console.log(
          this.navigation[this.section]
        )
        // 按照目录跳转，不要按照sectionInfo跳转
        // this.display(this.navigation[this.section].href)
        this.display(sectionInfo.href)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.setting-wrapper {
  position: absolute;
  left: 0;
  z-index: 200;
  bottom: px2rem(48);
  height: px2rem(90);
  width: 100%;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .setting-progress {
    bottom: px2rem(48);
    height: 100%;
    width: 100%;
    @include center;
    flex-direction: column;
    padding: 0 px2rem(5);
    box-sizing: border-box;
    .read-time-wrapper {
      @include center;
      .read-time-text {
        font-size: px2rem(14);
      }
      .iconright {
        font-size: px2rem(14);
        padding-left: px2rem(5);
      }
    }
    .progress-wrapper {
      display: flex;
      width: 100%;
      @include center;
      // height: 100%;
      .progress-icon-wrapper {
        @include center;
        margin: 0 px2rem(3);
        .iconleft {
          padding-right: px2rem(5);
        }
      }
      .progress {
        width: 100%;
        // 清除默认样式
        -webkit-appearance: none;
        height: px2rem(2);
        &:focus {
          outline: none;
        }
        // 进度条的手柄
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(13);
          width: px2rem(13);
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 4px 0 rgba($color: #000000, $alpha: 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      @include center;
      width: 100%;
      height: px2rem(20);
      padding: 0 px2rem(20);
      box-sizing: border-box;
      font-size: px2rem(14);
      padding-top: 20px;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
}
</style>
