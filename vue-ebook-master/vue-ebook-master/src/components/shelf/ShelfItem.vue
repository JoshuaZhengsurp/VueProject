<template>
  <div
    class="shelf-item shelf-item-shadow"
    :class="{'hide-shadow':data.type===3}"
    @click="onItemClick"
  >
    <component
      :is="item"
      :data="data"
    ></component>
    <div
      class="shelf-item-selected"
      v-show="isEditMode"
      :class="{'isEdit':isEditMode && data.type===2}"
      @click.stop="OnItemSelected"
    >
      <span
        class="iconfont iconselected"
        v-show="isEditMode && data.type ===1"
        :class="{'is-selected':data.selected}"
      ></span>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfItemAdd from './ShelfItemAdd'
import ShelfItemCategory from './ShelfItemCategory'
import ShelfItemBook from './ShelfItemBook'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfItemCategory,
    ShelfItemBook,
    ShelfItemAdd
  },
  computed: {
    item () {
      return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
    }
  },
  props: {
    data: Object
  },
  data () {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd
    }
  },
  methods: {
    // 点击相关图书/文件夹/添加，进行跳转
    onItemClick () {
      switch (this.data.type) {
        case 1:
          this.showBookDetail(this.data)
          break
        case 2:
          this.$router.push({
            path: '/store/category',
            query: {
              title: this.data.title
            }
          })
          break
        case 3:
          this.$router.replace('/store/home')
          break
      }
    },
    // 点击相关图书，进行选中操作
    OnItemSelected () {
      if (this.data.type === 1) { // 只能选择图书，不能选分类和添加
        this.data.selected = !this.data.selected
        if (this.data.selected) {
          this.shelfSelected.pushWidthoutDuplicate(this.data)
        } else {
          this.setShelfSelected(this.shelfSelected.filter(
            item => item.id !== this.data.id))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &.shelf-item-shadow {
    box-shadow: px2rem(4) px2rem(6) px2rem(6) px2rem(2)
      rgba($color: #666, $alpha: 0.2);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-item-selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.isEdit {
      background: #ddd;
      opacity: 0.4;
    }
    .iconselected {
      position: absolute;
      bottom: px2rem(3);
      right: px2rem(3);
      font-size: px2rem(18);
      color: rgba($color: #000, $alpha: 0.5);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
}
</style>
