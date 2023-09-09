<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="iconfont iconchakan"></span>
        </div>
        <input
          type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @focus="showSearchPage()"
          v-model="searchText"
          @keyup.enter.exact="search()"
        >
      </div>
      <div
        class="slide-contents-search-cancel"
        v-show="searchVisible"
        @click="hideSearchPage()"
      >{{$t('book.cancel')}}</div>
    </div>
    <!-- 图书详情信息、阅读时间等 -->
    <div
      class="slide-contents-book-wrapper"
      v-show="!searchVisible"
    >
      <div class="slide-contents-book-img-wrapper">
        <img
          :src="cover"
          class="slide-contents-book-img"
          alt="图书封面"
        >
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <!-- 目录信息 -->
    <Scroll
      class="slide-contents-list"
      :top="156"
      :bottom="49"
      v-show="!searchVisible"
      ref="scroll"
    >
      <div
        class="slide-contents-item"
        v-for="(item, index) in navigation"
        :key="index"
      >
        <div
          :class="{'selected':section===index}"
          class="slide-contents-item-label"
          :style="contentItemStyle(item)"
          @click="displayContent(item.href)"
        >{{item.label}}</div>
        <div class="slide-contents-item-page">{{item.page}}</div>
      </div>
    </Scroll>
    <!-- 搜索结果展示 -->
    <Scroll
      class="slide-search-list"
      :top="66"
      :bottom="49"
      v-show="searchVisible"
    >
      <div
        class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        v-html="item.excerpt"
        @click="displayContent(item.cfi,true)"
      ></div>
    </Scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data () {
    return {
      searchVisible: false,
      // 搜索结果的列表
      searchList: null,
      // 带搜索的文本
      searchText: ''
    }
  },
  methods: {
    // 搜索框获取焦点
    showSearchPage () {
      this.searchVisible = true
    },
    // 点击取消
    hideSearchPage () {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    },
    // 一级目录、二级目录、三级目录获取不同的偏移量
    contentItemStyle (item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    // 点击目录/搜索结果 进行跳转、展示
    displayContent (target, highlight = false) {
      this.display(target, cb => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    doSearch (q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item => item.load(this.currentBook.load.bind(this.currentBook))
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item))))
        .then(results => Promise.resolve([].concat.apply([], results)))
    },
    search () {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText)
          .then(list => {
            this.searchList = list
            this.searchList.map(item => {
              item.excerpt = item.excerpt.replace(this.searchText,
                `<span class="content-search-text">${this.searchText}</span>`)
              return item
            })
          })
        if (!this.searchList) {
          console.log('未搜索到内容')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
        .iconfont {
          font-size: px2rem(16);
        }
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          // 通过伪类，消除选中时候的效果
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        width: px2rem(150);
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        margin-top: px2rem(5);
        width: px2rem(150);
        @include ellipsis;
        font-size: px2rem(12);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      width: px2rem(70);
      .slide-contents-book-progress {
        font-size: 0;
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-time {
        margin-top: px2rem(5);
        font-size: px2rem(12);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      padding: px2rem(15) 0;
      box-sizing: border-box;
      display: flex;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(18);
        @include ellipsis;
      }
      .slide-contents-item-page {
        flex: 0 0 px2rem(30);
        @include right;
        font-size: px2rem(14);
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      padding: px2rem(15) 0;
      box-sizing: border-box;
      line-height: px2rem(16);
      font-size: px2rem(14);
    }
  }
}
</style>
