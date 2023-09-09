<template>
  <div class="store-shelf">
    <ShelfTitle></ShelfTitle>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      @onScroll="onScroll"
      :bottom="scrollBottom"
      ref="scroll"
    >
      <ShelfSearch></ShelfSearch>
      <ShelfList :data="shelfList"></ShelfList>
      <ShelfFooter></ShelfFooter>
    </scroll>
  </div>
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import Scroll from '../../components/common/Scroll'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle, Scroll, ShelfSearch, ShelfList, ShelfFooter
  },
  watch: {
    isEditMode (isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  data () {
    return {
      scrollBottom: 0
    }
  },
  mounted () {
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
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
}
</style>
