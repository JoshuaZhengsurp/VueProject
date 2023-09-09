<template>
  <div class="store-shelf">
    <ShelfTitle></ShelfTitle>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      @onScroll="onScroll"
      :bottom="scrollBottom"
      ref="scroll"
      v-if="shelfCategory.itemList&&shelfCategory.itemList.length>0"
    >
      <ShelfList
        :top="42"
        :data="shelfCategory.itemList"
      ></ShelfList>
      <ShelfFooter></ShelfFooter>
    </scroll>
    <div
      class="store-shelf-empty-view"
      v-else
    >{{$t('shelf.groupNone')}}</div>
  </div>
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import Scroll from '../../components/common/Scroll'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle, Scroll, ShelfList, ShelfFooter
  },
  watch: {
    isEditMode (isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        if (this.$refs.scroll) {
          // 当分组内没有图书，会没有scroll组件，也就没有refresh方法
          this.$refs.scroll.refresh()
        }
      })
    }
  },
  data () {
    return {
      scrollBottom: 0
    }
  },
  mounted () {
    this.getShelfCategory(this.$route.query.title)
    this.setCurrentType(2)
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.store-shelf {
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #fff;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .store-shelf-empty-view {
    color: #999;
    width: 100%;
    height: 100%;
    @include center;
    font-size: px2rem(18);
  }
}
</style>
