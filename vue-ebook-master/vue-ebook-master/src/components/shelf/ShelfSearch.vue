<template>
  <div
    class="shelf-search-wrapper"
    :class="{'search-top':ifInputClicked,'hide-shadow':ifHideShadow}"
  >
    <!-- 搜索框 -->
    <div
      class="shelf-search"
      :class="{'search-top':ifInputClicked}"
    >
      <!-- 搜索框，以及搜索图标-清除图标 -->
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="iconfont iconchakan"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            @keyup.esc="esc"
            v-model="searchText"
          >
        </div>
        <div
          class="icon-clear-wrapper"
          v-show="searchText.length > 0"
          @click="clearSearchText"
        >
          <span class="iconfont iconiconfontclose"></span>
        </div>
      </div>
      <!-- 切换语言的图标 -->
      <div
        class="icon-locale-wrapper"
        v-show="!ifInputClicked"
        @click="switchLocale"
      >
        <span
          class="iconfont iconyingyizhong"
          v-if="lang === 'cn'"
        ></span>
        <span
          class="iconfont iconzhongyiying"
          v-else
        ></span>
      </div>
      <!-- 点击搜索框后的 取消 -->
      <div
        class="cancel-btn-wrapper"
        v-show="ifInputClicked"
        @click="onCancelClick"
      >
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <!-- 搜索框下面的tab -->
    <transition name="hot-search-move">
      <div
        class="shelf-search-tab-wrapper"
        v-show="ifInputClicked"
      >
        <div
          class="shelf-search-tab-item"
          v-for="(item, index) in tabs"
          :key="index"
          @click="onTabClick(item.id)"
        >
          <span
            class="shelf-search-tab-text"
            :class="{'is-searched':selectedTab===item.id}"
          >{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { saveLocale } from '../../utils/localStorage'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  data () {
    return {
      ifInputClicked: false,
      searchText: '',
      selectedTab: 1,
      ifHideShadow: true
    }
  },
  watch: {
    offsetY (offsetY) {
      if (offsetY > 0 && this.ifInputClicked) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    tabs () {
      return [
        {
          id: 1,
          text: this.$t('shelf.default')
        },
        {
          id: 2,
          text: this.$t('shelf.progress')
        },
        {
          id: 3,
          text: this.$t('shelf.purchase')
        }
      ]
    }
  },
  methods: {
    esc () {
      if (this.ifInputClicked === true) {
        this.onCancelClick()
      }
    },
    onSearchClick () {
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    onCancelClick () {
      this.clearSearchText()
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    },
    // 切换语言
    switchLocale () {
      if (this.lang === 'cn') {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'cn'
      }
      saveLocale(this.$i18n.locale)
    },
    clearSearchText () {
      this.searchText = ''
    },
    onTabClick (id) {
      this.selectedTab = id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: px2rem(94);
  font-size: px2rem(16);
  background: #fff;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.2);
  &.hide-shadow {
    box-shadow: none;
  }
  &.search-top {
    position: fixed;
    left: 0;
    top: 0;
  }
  .shelf-search {
    display: flex;
    position: absolute;
    top: px2rem(42);
    left: 0;
    z-index: 105;
    width: 100%;
    height: px2rem(52);
    transition: top 0.2s linear;
    &.search-top {
      top: 0;
      z-index: 131;
    }
    .search-wrapper {
      display: flex;
      margin: px2rem(8) 0 px2rem(8) px2rem(19);
      border: px2rem(1) solid #ccc;
      flex: 1;
      .icon-search-wrapper {
        flex: 0 0 px2rem(22);
        @include right;
        .iconchakan {
          font-size: px2rem(12);
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        @include center;
        .search-input {
          width: 100%;
          font-size: px2rem(14);
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
            font-size: px2rem(14);
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 px2rem(24);
        @include left;
        .iconiconfontclose {
          color: #ccc;
          font-size: px2rem(16);
        }
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .iconyingyizhong {
        font-size: px2rem(22);
        color: #666;
      }
      .iconzhongyiying {
        font-size: px2rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .cancel-text {
        font-size: px2rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    top: px2rem(52);
    width: 100%;
    z-index: 105;
    left: px2rem(-10);
    height: px2rem(42);
    display: flex;
    .shelf-search-tab-item {
      flex: 1;
      @include center;
      .shelf-search-tab-text {
        font-size: px2rem(14);
        color: #aaa;
        &.is-searched {
          color: $color-blue;
        }
      }
    }
  }
}
</style>
