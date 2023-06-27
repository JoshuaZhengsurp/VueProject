<template>
  <div class="aaa">
    <div
      class="search-bar"
      :class="{'hide-title':!titleVisible,'hide-shadow':shadowVisible}"
    >
      <!-- 书城标题和右面的图标 -->
      <transition name="title-move">
        <div
          class="search-bar-title-wrapper"
          v-show="titleVisible"
        >
          <div class="title-text-wrapper">
            <span class="title-text">{{$t('home.title')}}</span>
          </div>
          <!-- shake移动，动摇，摇一摇 -->
          <div
            class="title-icon-shake-wrapper"
            @click="showFlapCard"
          >
            <span class="iconfont iconyaoyiyao"></span>
          </div>
        </div>
      </transition>
      <!-- 书城标题左侧的返回图标 -->
      <div
        class="title-icon-back-wrapper"
        :class="{'hide-title':!titleVisible}"
        @click="back"
      >
        <span class="iconfont iconbackarrow"></span>
      </div>
      <!-- 搜索框 -->
      <div
        class="search-bar-input-warpper"
        :class="{'hide-title':!titleVisible}"
      >
        <!-- 占位用的，无内容 -->
        <div
          class="search-bar-blank"
          :class="{'hide-title':titleVisible}"
        ></div>
        <div class="search-bar-input">
          <span class="iconfont iconchakan"></span>
          <input
            type="text"
            class="input"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
            @keyup.enter.exact="search"
          >
        </div>
      </div>
    </div>
    <HotSearchList
      v-show="hotSearchVisible"
      ref="hotSearch"
    ></HotSearchList>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import HotSearchList from './HotSearchList'
export default {
  mixins: [storeHomeMixin],
  components: {
    HotSearchList
  },
  data () {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    }
  },
  watch: {
    offsetY (offsetY) {
      if (offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY (hotSearchOffsetY) {
      if (hotSearchOffsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    back () {
      if (this.offsetY > 0) {
        this.showShadow()
        this.hideTitle()
      } else {
        this.hideShadow()
        this.showTitle()
      }
      if (this.hotSearchVisible) {
        this.hideHotSearch()
      } else {
        this.$router.push('/store/shelf')
      }
    },
    showFlapCard () {
      this.setFlapcardVisible(true)
      this.$emit('recommendBook')
    },
    hideTitle () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
    },
    hideShadow () {
      this.shadowVisible = false
    },
    showShadow () {
      this.shadowVisible = true
    },
    hideHotSearch () {
      this.hotSearchVisible = false
    },
    // 点击搜索框-进入搜索页面
    showHotSearch () {
      if (this.hotSearchOffsetY === 0) {
        this.hideShadow()
      } else if (this.hotSearchOffsetY > 0) {
        this.showShadow()
      }
      this.hideTitle()
      this.hotSearchVisible = true
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    search () {
      console.log(this.searchText)
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.search-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: px2rem(94);
  z-index: 150;
  position: relative;
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: 0 px2rem(2) px2rem(5) #999;
  }
  .search-bar-title-wrapper {
    display: flex;
    .title-text-wrapper {
      flex: 1;
      @include center;
      height: px2rem(37);
      .title-text {
        font-size: px2rem(22);
        font-weight: 700;
        color: #5b5b5b;
      }
    }
    .title-icon-shake-wrapper {
      flex: 0 0 px2rem(40);
      @include left;
      height: px2rem(37);
      .iconyaoyiyao {
        color: #666;
      }
    }
  }
  .title-icon-back-wrapper {
    height: px2rem(42);
    position: absolute;
    left: px2rem(10);
    z-index: 200;
    top: 0;
    transition: height $animationTime $animationType;
    @include center;
    &.hide-title {
      height: px2rem(52);
    }
    .iconbackarrow {
      color: #666;
    }
  }
  .search-bar-input-warpper {
    display: flex;
    position: absolute;
    left: 0;
    top: px2rem(42);
    height: px2rem(52);
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    @include center;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: px2rem(0);
    }
    .search-bar-blank {
      flex: 0 0 px2rem(31);
      width: px2rem(31);
      background: #eaa;
      transition: all $animationTime $animationType;
      &.hide-title {
        flex: 0 0 0;
        width: 0;
      }
    }
    .search-bar-input {
      display: flex;
      width: 100%;
      border-radius: px2rem(20);
      background: #f4f4f4;
      padding: px2rem(5) px2rem(15);
      box-sizing: border-box;
      border: px2rem(1) solid #eee;
      .iconchakan {
        font-size: px2rem(14);
        @include center;
        color: #999;
      }
      .input {
        width: 100%;
        font-size: px2rem(14);
        background: transparent;
        border: none;
        margin-left: px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>
