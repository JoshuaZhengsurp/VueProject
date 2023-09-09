<template>
  <div class="title-bar">
    <transition name="slide-down">
      <div
        class="title-wrapper"
        v-show="menuVisible"
      >
        <div
          class="left"
          @click="back"
        >
          <span class="iconfont iconbackarrow"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="iconfont iconbooks"></span>
          </div>
          <div class="icon-wrapper">
            <span class="iconfont iconiconfontcart-copy"></span>
          </div>
          <div class="icon-wrapper">
            <span class="iconfont iconi-more"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
    // 阅读中，点击左上角返回图标，返回上一页
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 201;
  // 蒙版层是200
  width: 100%;
  height: px2rem(48);
  display: flex;
  background: #c7c7c7;
  box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
}
</style>
