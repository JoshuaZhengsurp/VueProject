<template>
  <div class="shelf-item-add">
    <span class="iconfont iconjia"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-item-add {
  width: 100%;
  height: 100%;
  @include center;
  border: px2rem(1) solid #ccc;
  box-sizing: border-box;
  .iconjia {
    color: #ccc;
    font-size: px2rem(32);
  }
}
</style>
