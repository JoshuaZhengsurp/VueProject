<template>
  <div class="shelf-item-category">
    <div
      class="shelf-item-category-list"
      v-if="data.itemList.length > 0"
    >
      <div
        class="shelf-item-category-item"
        v-for="(item, index) in data.itemList"
        :key="index"
      >
        <img
          :src="item.cover"
          class="shelf-item-category-img"
        >
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="iconfont iconbook"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-item-category {
  width: 100%;
  height: 100%;
  .shelf-item-category-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    .shelf-item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      padding: px2rem(2);
      box-sizing: border-box;
      .shelf-item-category-img {
        width: 100%;
      }
    }
  }
  .shelf-item-category-bg {
    @include center;
    width: 100%;
    height: 100%;
    .iconbook {
      font-size: px2rem(26);
      color: #716c6c;
    }
  }
}
</style>
