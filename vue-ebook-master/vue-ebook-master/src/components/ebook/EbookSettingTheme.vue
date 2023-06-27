<template>
  <transition name="slide-up">
    <div
      class="setting-wrapper"
      v-if="menuVisible && settingVisible === 1"
    >
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{background: item.style.body.background}"
            :class="{'no-border':item.style.body.background !== '#fff',
            'selected':item.name===defaultTheme}"
          ></div>
          <div
            class="text"
            :class="{'selected':item.name===defaultTheme}"
          >{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { saveTheme } from '../../utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    setTheme (index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        // BUG console.log('抽风的玩意，一会可以一会不可以，是下一步的问题')
        this.currentBook.rendition.themes.select(theme.name)
        this.initGlobalStyle()
      })
      saveTheme(theme.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.setting-wrapper {
  z-index: 200;
  position: absolute;
  left: 0;
  bottom: px2rem(48);
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .setting-theme {
    width: 100%;
    display: flex;
    height: 100%;
    .setting-theme-item {
      padding: px2rem(5);
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      // background: #c7c7c7;
      .preview {
        flex: 1;
        box-sizing: border-box;
        // &.no-border {
        //   border: none;
        // }
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba($color: #000000, $alpha: 0.1);
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
        color: #999;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
