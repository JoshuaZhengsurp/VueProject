<template>
  <transition name="fade">
    <div
      class="shelf-title"
      :class="{'hide-shadow':ifHideShadow}"
      v-show="shelfTitleVisible"
    >
      <!-- 书架以及书架下面的选择书籍 -->
      <div class="shelf-title-text-wrapper">
        <span
          class="shelf-title-text"
          v-if="currentType===1"
        >{{$t('shelf.title')}}</span>
        <span
          class="shelf-title-text"
          v-else
        >{{shelfCategory.title}}</span>
        <span
          class="shelf-title-sub-text"
          v-show="isEditMode"
        >{{selectedText}}</span>
      </div>
      <!-- 左侧的清除缓存，或者返回图标 -->
      <div
        class="shelf-title-btn-wrapper shelf-title-left"
        @click="clearCache"
        v-if="currentType===1"
      >
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <!-- 返回图标 -->
      <div
        class="shelf-title-btn-wrapper shelf-title-left"
        v-else
      >
        <span
          class="shelf-title-btn-text iconfont iconbackarrow"
          v-if="currentType===2 && isEditMode===false"
          @click="back"
        ></span>
        <span
          class="shelf-title-btn-text"
          @click="editGroup"
          v-else
        >{{$t('shelf.editGroup')}}</span>
      </div>
      <!-- 右边的编辑 -->
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span
          class="shelf-title-btn-text"
          @click="editGroup"
          v-if="currentType===2 && shelfCategory.itemList && shelfCategory.itemList.length===0"
        >{{$t('shelf.editGroup')}}</span>
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
          v-else
        >{{isEditMode?$t('shelf.cancel'):$t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage'
import { clearLocalForage } from '../../utils/localForage'
export default {
  mixins: [storeShelfMixin],
  computed: {
    selectedText () {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      if (this.isEditMode && selectedNumber === 0) {
        return this.$t('shelf.selectBook')
      } else if (this.isEditMode && selectedNumber === 1) {
        return this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
      } else if (this.isEditMode && selectedNumber > 1) {
        return this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber)
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      ifHideShadow: true,
      popupMenu: null
    }
  },
  watch: {
    offsetY (offsetY) {
      if (this.currentType === 1) {
        if (offsetY > 52) {
          // 52是shelfTitle下面ShelfSearch的高度
          this.ifHideShadow = false // 显示阴影
        } else {
          this.ifHideShadow = true
        }
      } else if (this.currentType === 2) {
        if (offsetY > 0) {
          // 52是shelfTitle下面ShelfSearch的高度
          this.ifHideShadow = false // 显示阴影
        } else {
          this.ifHideShadow = true
        }
      }
    }
  },
  methods: {
    onEditClick () {
      this.setIsEditMode(!this.isEditMode)
      if (this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach(item => {
          item.selected = false
          if (item.itemList) {
            item.itemList.forEach(subItem => {
              subItem.selected = false
            })
          }
        })
      }
    },
    clearCache () {
      this.setIsEditMode(false)
      clearLocalStorage()
      clearLocalForage()
      this.setShelfSelected([])
      this.setShelfList([])
      this.getShelfList()
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
    },
    back () {
      this.$router.go(-1)
      this.setIsEditMode(false)
    },
    editGroup () {
      this.popupMenu = this.popup({
        btn: [{
          text: this.$t('shelf.editGroupName'),
          click: () => this.editGroupName()
        }, {
          text: this.$t('shelf.deleteGroup'),
          type: 'danger',
          click: () => this.showDeleteGroupDialog()
        }, {
          text: this.$t('shelf.cancel'),
          click: () => this.popupMenu.hide()
        }]
      }).show()
    },
    editGroupName () {
      console.log('修改分组名')
      this.popupMenu.hide()
      this.dialog({
        showNewGroup: true,
        groupName: this.shelfCategory.title
      }).show()
    },
    showDeleteGroupDialog () {
      this.popupMenu.hide()
      setTimeout(() => {
        console.log('345534')
        this.popupMenu = this.popup({
          title: this.$t('shelf.deleteGroupTitle'),
          btn: [{
            text: this.$t('shelf.confirm'),
            type: 'danger',
            click: () => this.deleteGroup()
          }, {
            text: this.$t('shelf.cancel'),
            click: () => this.popupMenu.hide()
          }]
        }).show()
      }, 350)
    },
    deleteGroup () {
      console.log('删除分组')
      if (!this.emptyCategory) {
        // 非空分组
        this.setShelfSelected(this.shelfCategory.itemList)
        this.moveOutOfGroup(this.onComplete)
      } else {
        this.onComplete()
      }
    },
    onComplete () {
      this.popupMenu.hide()
      this.setIsEditMode(false)
      this.setShelfList(this.shelfList.filter(book =>
        book.id !== this.shelfCategory.id
      )).then(() => {
        saveBookShelf(this.shelfList)
        this.$router.go(-1)
        this.simpleToast('分组删除成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-title {
  z-index: 130;
  position: relative;
  width: 100%;
  height: px2rem(42);
  background: #fff;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.2);
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: px2rem(16);
      line-height: px2rem(16);
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text {
      margin-top: px2rem(2);
      font-size: px2rem(10);
      color: #333;
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    .shelf-title-btn-text {
      font-size: px2rem(14);
      color: #666;
    }
    &.shelf-title-left {
      padding-left: px2rem(16);
      left: 0;
    }
    &.shelf-title-right {
      padding-right: px2rem(16);
      right: 0;
    }
  }
}
</style>
