<template>
  <!-- popup的英文是弹出的意思 -->
  <div
    class="popup"
    v-show="popupVisible"
  >
    <transition name="fade">
      <div
        class="popup-bg"
        @click.stop="hide"
        v-show="popupVisible"
      ></div>
    </transition>
    <transition name="popup-slide-up">
      <div
        class="popup-wrape"
        v-show="visible"
      >
        <div
          class="popup-title"
          v-if="title && title.length>0"
        >{{title}}</div>
        <div
          class="popup-btn"
          v-for="(item, index) in btn"
          :key="index"
          :class="{'danger':item.type==='danger'}"
          @click="item.click"
        >{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    title: String,
    btn: Array
  },
  data () {
    return {
      popupVisible: false,
      visible: false // 这个变量是为了动画，时间差
    }
  },
  methods: {
    show () {
      this.popupVisible = true
      setTimeout(() => {
        this.visible = true
      })
    },
    hide () {
      this.visible = false
      setTimeout(() => {
        this.popupVisible = false
      }, 340)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2080;
  .popup-bg {
    width: 100%;
    height: 100%;
    background: rgba($color: #666, $alpha: 0.5);
  }
  .popup-wrape {
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
    .popup-title {
      color: #aaa;
      font-size: px2rem(14);
      height: px2rem(44);
      width: 100%;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      @include center;
    }
    .popup-btn {
      height: px2rem(61);
      width: 100%;
      font-size: px2rem(18);
      font-weight: bold;
      color: #000;
      @include center;
      border-top: px2rem(1) solid #eee;
      &.danger {
        color: $color-pink;
      }
    }
  }
}
</style>
