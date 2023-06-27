<template>
  <div class="menu-bar">
    <!-- 最底侧菜单条 -->
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        v-show="menuVisible"
        :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}"
      >
        <div
          class="icon-wrapper"
          @click="showSetting(3)"
        >
          <span class="iconfont iconmenu"></span>
        </div>
        <div
          class="icon-wrapper"
          @click="showSetting(2)"
        >
          <span class="iconfont iconprogress"></span>
        </div>
        <div
          class="icon-wrapper"
          @click="showSetting(1)"
        >
          <span class="iconfont iconliangdu-"></span>
        </div>
        <div
          class="icon-wrapper"
          @click="showSetting(0)"
        >
          <span class="iconfont iconfont-font"></span>
        </div>
      </div>
    </transition>
    <EbookSettingFont></EbookSettingFont>
    <EbookSettingFontPopup></EbookSettingFontPopup>
    <EbookSettingTheme></EbookSettingTheme>
    <EbookSettingProgress></EbookSettingProgress>
    <EbookSlide></EbookSlide>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },
  data () {
    return {
      isSettingShow: false,
      oldKey: 99
    }
  },
  methods: {
    // 显示设置框：-1：不显示，0：字号，1：主题、2：进度条、3：目录
    showSetting (key) {
      // oldKey,上一次的key，用来比较两次key是否相同，相同则隐藏
      if (this.oldKey === key) {
        this.setSettingVisible(-1)
        this.oldKey = 99
      } else {
        this.setSettingVisible(key)
        this.oldKey = key
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 201;
    width: 100%;
    height: px2rem(48);
    background: #c7c7c7;
    box-shadow: 0 - px2rem(8) px2rem(8) rgba($color: #000, $alpha: 0.15);
    display: flex;
    &.hide-box-shadow {
      box-shadow: 0 0 0;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .iconprogress {
        font-size: px2rem(26);
      }
      .iconliangdu- {
        font-size: px2rem(24);
      }
    }
  }
}
</style>
