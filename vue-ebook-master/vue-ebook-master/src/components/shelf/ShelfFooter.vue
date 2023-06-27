<template>
  <div
    class="shelf-footer"
    v-show="isEditMode"
  >
    <div
      class="shelf-footer-tab-wrapper"
      v-for="(item, index) in tab"
      :key="index"
    >
      <div
        class="shelf-footer-tab"
        @click="OnTabClick(item)"
        :class="{'isSelected':isSelected}"
      >
        <span
          class="iconfont tab-icon"
          :class="labelAndIcon(item,'icon')"
        ></span>
        <span
          class="tab-text"
          :class="{'red':item.label===$t('shelf.remove')}"
        >{{labelAndIcon(item,'label')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { storeShelfMixin } from '../../utils/mixin'
import { saveBookShelf, removeLocalStorage } from '../../utils/localStorage'
import { download } from '../../api/store'
import { removeLocalForage } from '../../utils/localForage'
export default {
  mixins: [storeShelfMixin],
  computed: {
    tab () {
      return [
        {
          index: 1,
          icon: 'iconyinsiguan', // 这俩图标不形象，找到合适的换了他
          icon2: 'iconyinsikai',
          label: this.$t('shelf.private'), // 私密阅读
          label2: this.$t('shelf.noPrivate') // 关闭私密阅读
        },
        {
          index: 2,
          icon: 'iconxiazai',
          icon2: 'iconshanchuyunxian',
          label: this.$t('shelf.download'), // 开启离线
          label2: this.$t('shelf.delete') // 删除
        },
        {
          index: 3,
          icon: 'iconyidong',
          label: this.$t('shelf.move') // 移动到
        },
        {
          index: 4,
          icon: 'iconshujia',
          label: this.$t('shelf.remove') // 移出书架
        }
      ]
    },
    isSelected () {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    // 判断所选图书是否为全部为私密图书，返回false、true
    isPrivate () {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every(item => item.private === true) // ===true可以省略掉
      }
    },
    // 判断所选图书是否全部为离线图书，返回false、true
    isDownload () {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every(item => item.cache)
      }
    }
  },
  data () {
    return {
      popupMenu: null
    }
  },
  mounted () {
    console.log(this.$t('shelf.addBook'))
  },
  methods: {
    // 隐藏popup，对所有popup起作用
    hidePopup () {
      this.popupMenu.hide()
    },
    // 下方tab的单击事件
    OnTabClick (item) {
      if (!this.isSelected) { // 没有选中图书，不处理
        return
      }
      switch (item.index) {
        case 1:
          this.showPrivate()
          break
        case 2:
          this.showDownload()
          break
        case 3:
          this.dialog().show()
          break
        case 4:
          this.showRemove()
          break

        default:
          break
      }
    },
    // 显示隐私设置的菜单框
    showPrivate () {
      this.popupMenu = this.popup({
        title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
        btn: [{
          text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
          click: () => {
            this.setPrivate()
          }
        }, {
          text: this.$t('shelf.cancel'),
          click: () => this.popupMenu.hide()
        }]
      }).show()
    },
    // 隐私,设置
    setPrivate () {
      // 举例：this.isPrivate=false(选中的图书非私密图书)，isPrivate=true，将选中的图书设为私密图书
      let isPrivate // 此变量表示要进行设置的模式，
      if (this.isPrivate) { // 计算属性的isPrivate，表示所选图书是否为私密图书
        isPrivate = false
      } else {
        isPrivate = true
      }
      this.shelfSelected.forEach(book => {
        book.private = isPrivate
      })
      this.reset()
      if (isPrivate) {
        this.simpleToast(this.$t('shelf.setPrivateSuccess'))
      } else {
        this.simpleToast(this.$t('shelf.closePrivateSuccess'))
      }
    },
    // 显示离线下载设置的菜单框
    showDownload () {
      this.popupMenu = this.popup({
        title: this.isDownload ? this.$t('shelf.removeDownloadTitle') : this.$t('shelf.setDownloadTitle'),
        btn: [{
          text: this.isDownload ? this.$t('shelf.delete') : this.$t('shelf.open'),
          type: this.isDownload ? 'danger' : '',
          click: () => {
            this.setDownload()
          }
        }, {
          text: this.$t('shelf.cancel'),
          click: () => {
            this.popupMenu.hide()
          }
        }]
      }).show()
    },
    // 关于下载
    setDownload () {
      let isDownload
      if (this.isDownload) {
        isDownload = false
      } else {
        isDownload = true
      }
      this.shelfSelected.forEach(book => {
        book.cache = isDownload
      })
      if (isDownload) {
        this.simpleToast(this.$t('shelf.setDownloadSuccess'))
        this.downloadSelectedBook()
      } else {
        this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
        this.removeSelectedBook()
      }
      this.reset()
    },
    downloadSelectedBook () {
      for (let i = 0; i < this.shelfSelected.length; i++) {
        this.downloadBook(this.shelfSelected[i])
      }
    },
    downloadBook (book) {
      return new Promise((resolve, reject) => {
        download(book, onSuccess => {
          this.simpleToast(this.$t('shelf.downloadCompletes'))
          console.log('下载完成')
          resolve(book)
        }, reject, onProgress => {
          const percent = Math.floor(onProgress.loaded / onProgress.total * 100) + '%'
          const text = this.$t('shelf.progressDownload').replace('$1', book.title)
          this.simpleToast(`${text}(${percent})`)
        })
      })
    },
    removeSelectedBook () {
      Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
        .then(books => {
          books.map(book => { book.cache = false })
        })
      saveBookShelf(this.shelfList)
      this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
    },
    removeBook (book) {
      return new Promise((resolve, reject) => {
        removeLocalStorage(`${book.categoryText}/${book.fileName}-info`)
        removeLocalForage(`${book.fileName}`)
        resolve(book)
      })
    },
    // 显示移出书架的菜单框
    showRemove () {
      const replaceText = this.shelfSelected.length > 1
        ? this.$t('shelf.selectedBooks') : `《${this.shelfSelected[0].title}》`
      this.popupMenu = this.popup({
        title: this.$t('shelf.removeBookTitle').replace('$1', replaceText),
        btn: [{
          text: this.$t('shelf.removeBook'),
          type: 'danger',
          click: () => {
            this.removeSelected()
          }
        }, {
          text: this.$t('shelf.cancel'),
          click: () => {
            this.popupMenu.hide()
          }
        }]
      }).show()
    },
    removeSelected () {
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.shelfList.filter(book => book !== selected))
      })
      this.reset()
    },
    // 关闭弹出框，清空选中项目,将数据存入缓存
    reset () {
      saveBookShelf(this.shelfList)
      this.hidePopup()
      this.setShelfSelected([])
      this.shelfList.forEach(item => {
        item.selected = false
      })
      this.setIsEditMode(false)
    },
    // 动态显示tab的tab-text,或者tab-icon
    labelAndIcon (item, str) {
      // str为'label'或者'icon'
      const str2 = str + '2'
      // ASK item虽然是对象{}，但是也可以用item[str]，item.str这样写str不是引用的变量
      switch (item.index) {
        case 1:
          return this.isPrivate ? item[str2] : item[str]
        case 2:
          return this.isDownload ? item[str2] : item[str]
        case 3:
          return item[str]
        case 4:
          return item[str]
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(-2) px2rem(6) px2rem(4) rgba($color: #ccc, $alpha: 0.3);
  display: flex;
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      @include columnCenter;
      opacity: 0.5;
      &.isSelected {
        opacity: 1;
      }
      .tab-icon {
        font-size: px2rem(20);
        color: #666;
        &.iconyinsiguan,
        .iconyinsikai {
          font-size: px2rem(14);
          line-height: px2rem(20);
        }
        &.iconshujia {
          color: #e67aa7;
        }
      }
      .tab-text {
        margin-top: px2rem(3);
        font-size: px2rem(14);
        color: #666;
        &.red {
          color: #e67aa7;
        }
      }
    }
  }
}
</style>
