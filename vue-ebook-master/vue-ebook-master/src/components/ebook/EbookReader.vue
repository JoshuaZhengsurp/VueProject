<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div
      class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { flatten } from '../../utils/book'
import { getLocalForage } from '../../utils/localForage'
import {
  getFontFamily, saveFontFamily,
  getFontSize, saveFontSize,
  saveTheme, getTheme,
  getLocation
} from '../../utils/localStorage'
import Epub from 'epubjs'
global.epub = Epub
export default {
  mixins: [ebookMixin],
  mounted () {
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {
        console.log('找到离线缓存电子书')
        this.setFileName(books.join('/')).then(() => {
          this.initEpub(blob)
        })
      } else {
        console.log('在线获取电子书')
        this.setFileName(books.join('/')).then(() => {
          const url = `${process.env.VUE_APP_EPUB_URL}/` + this.fileName + '.epub'
          this.initEpub(url)
        })
      }
    })
  },
  data () {
    return {
      firstOffsetY: 0,
      // 鼠标状态
      mouseState: 0,
      mouseStartTime: 0
    }
  },
  methods: {
    onMouseEnter (e) {
      // 鼠标进入--点击了左键
      this.mouseState = 1
      this.mouseStartTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove (e) {
      // 鼠标移动事件
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd (e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseStartTime
      if (time < 200) {
        this.mouseState = 4
      }
      e.preventDefault()
      e.stopPropagation()
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => { this.refreshLocation() })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => { this.refreshLocation() })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible === false) {
        this.setSettingVisible(-1)
      }
      this.setFontFamilyVisible(false)
      this.setMenuVisible(!this.menuVisible)
    },
    initTheme () {
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      const theme = getTheme()
      if (!theme) {
        saveTheme(this.defaultTheme)
      }
      this.rendition.themes.select(theme)
      this.setDefaultTheme(theme)
    },
    // 初始化字体样式
    initFontFamily () {
      // 获取缓存中的字体样式
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      }
      this.currentBook.rendition.themes.font(font)
      this.setDefaultFontFamily(font)
    },
    initFontSize () {
      // 获取缓存中的字号大小
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      }
      this.setDefaultFontSize(fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize + 'px')
    },
    // 初始化rendtion对象
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        // 兼容微信
        methods: 'default'
        // 上下移动阅读
        // flow: 'scrolled'
      })
      // location是代表阅读进度的
      const location = getLocation(this.fileName)
      this.display(location, cb => {
        this.initTheme()
        this.initFontFamily()
        this.initFontSize()
        this.initGlobalStyle()
      })
      // 向图书iframe框架中，加载字体
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            'https://fonts.font.im/css?family=Hanalei+Fill|Kirang+Haerang|Merriweather|MedievalSharp|Ranga')
        ]).then(() => {
          // console.log('字体全部加载完毕。。。')
        })
      })
    },
    // 初始化滑动手势
    initGesture () {
      // ASK 标记一下，touchstart事件只能用于手机，浏览器开手机UA也可以
      // 滑动事件，用来检测翻页动作
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.timeStamp = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.timeStamp
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // 此函数 https://www.cnblogs.com/joesbell/p/5881418.html
        // event.preventDefault()
        // 该方法将停止事件的传播，阻止它被分派到其他 Document 节点
        event.stopPropagation()
      })
    },
    // 解析电子书内容，获取封面，标题，作者等信息
    parseBook () {
      // 获取cover
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      // 标题作者
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      // 目录信息
      this.book.loaded.navigation.then(nav => {
        // flatten--扁平化处理，三维数组变一维数组
        const navItem = flatten(nav.toc)
        // 判断当前目录是第几级目录
        function find (item, v = 0) {
          const parent = navItem.filter(it => it.id === item.parent)[0]
          return !item.parent ? v : (parent ? find(parent, ++v) : v)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        // BUG 这里没问题，navigation目录中没有目录-和作者信息，二section跳转时候，会有他们，所以会差两节
        // 用老师的书，没有问题，我自己写的书有这个问题(中英文的问题？、我下的书没有完全符号epub标准？)
        this.setNavigation(navItem)
      })
    },
    initEpub (url) {
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      // 上层添加新的蒙版，手势不起作用了
      // this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        // 分页算法，只能粗略估计百分比，不能用于具体页数计算
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.navigation.forEach(nav => {
          nav.pagelist = []
        })
        locations.forEach(item => {
          const loc = item.match(/\[(.*)\]!/)[1]
          this.navigation.forEach(nav => {
            if (nav.href) {
              const href = nav.href.match(/^(.*)\.html$/)[1]
              if (href) {
                if (href[1] === loc) {
                  nav.pagelist.push(item)
                }
              }
            }
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = 1
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pagelist.length + 1
          })
        })
        this.setPagelist(locations)
        // 分页完成后，允许拖动低难度条
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    },
    // 蒙版的点击事件
    onMaskClick (e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return
      }
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    move (e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd (e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 150;
    width: 100%;
    height: 100%;
  }
}
</style>
