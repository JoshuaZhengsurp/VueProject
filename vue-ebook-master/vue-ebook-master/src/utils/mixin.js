import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss } from './book'
import { saveLocation, getReadTime, getBookmark, getBookShelf, saveBookShelf } from '../utils/localStorage'
import { shelf } from '../api/store'
import { removeAddFromShelf, appendAddToShelf, computeId } from './store'

// 书架页面
export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail (book) {
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    },
    async getShelfList () {
      var shelfList = getBookShelf()
      if (!shelfList) {
        const { data } = await shelf()
        console.log(data.bookList)
        //  mock不起作用了，返回的数据为空
        if (data?.bookList) {
          console.log(1414)
          shelfList = appendAddToShelf(data.bookList)
          saveBookShelf(shelfList)
          return this.setShelfList(shelfList)
        }
      } else {
        return this.setShelfList(shelfList)
      }
    },
    getShelfCategory (title) {
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(item => item.type === 2 && item.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    },
    moveOutOfGroup (cb) {
      // 将选中的图书移出分组
      this.setShelfList(this.shelfList.map(book => {
        if (book.type === 2 && book.itemList) {
          book.itemList = book.itemList.filter(subBook => !subBook.selected)
        }
        return book
      })).then(() => {
        let list = removeAddFromShelf(this.shelfList)
        list = [].concat(list, ...this.shelfSelected)
        list = computeId(appendAddToShelf(list))
        this.setShelfList(list).then(() => {
          this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
          if (cb) cb()
        })
      })
    }
  }
}
// home页面部分需要的，变量，方法，计算属性等的
export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapcardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapcardVisible',
      'setisEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible'
    ]),
    showBookDetail (book) {
      // book是图书信息
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}
// ebook阅读器部分需要的，变量，方法，计算属性等的
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList () {
      return themeList(this)
    },
    getSectionName () {
      // 获取章节名称
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    ...mapActions([
      // 下面的方法用来设置上面变量的值,下面方法是异步的.then()
      'setMenuVisible',
      'setFileName',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    // 初始化全局样式
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_default.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_eye.css`)
          break
        case 'Nigth':
          addCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_default.css`)
          break
      }
    },
    // 保存阅读进度
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start && currentLocation.start.index) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
        // 判断书签
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }
        if (this.pagelist) {
          const totalPage = this.pagelist.length
          const currentPage = currentLocation.start.location
          if (currentPage && currentPage >= 0) {
            // >=0表示分页完成，分页未完成未0
            this.setPaginate(currentPage + '/' + totalPage)
          } else {
            this.setPaginate('')
          }
        } else {
          // 分页为完成
          this.setPaginate('')
        }
      }
    },
    // 用来简化的this.currentBook.rendition.display
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    // 隐藏标题栏和菜单栏
    hideTitleAndMenu () {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
      this.setFontFamilyVisible(false)
    },
    // 获取阅读时间
    getReadTimeText () {
      const readTime =
        this.$t('book.haveRead').replace('$1', (getReadTime(this.fileName) / 60) || 0)
      // readTime 已读xx分钟
      return readTime
    }
  }
}
