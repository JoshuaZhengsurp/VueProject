<template>
  <transition name="fade">
    <div
      class="slide-content-wrapper"
      v-show="menuVisible && settingVisible === 3"
    >
      <transition name="fade-slide-right">
        <div
          class="content"
          v-if="settingVisible === 3"
        >
          <div
            class="content-page-wrapper"
            v-if="bookAvailable"
          >
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmart"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{'selected':currentTab === 1}"
                @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div
                class="content-page-tab-item"
                :class="{'selected':currentTab === 0}"
                @click="selectTab(0)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div
            class="content-empty"
            v-else
          >
            <EbookLoading></EbookLoading>
          </div>
        </div>
      </transition>
      <div
        class="content-bg"
        @click="hide()"
      ></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSlideBookMark from './EbookSlideBookMark'
import EbookSlideContents from './EbookSlideContents'
import EbookLoading from './EbookLoading'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSlideContents, EbookSlideBookMark, EbookLoading
  },
  data () {
    return {
      currentTab: 1,
      content: EbookSlideContents,
      bookmart: EbookSlideBookMark
    }
  },
  methods: {
    hide () {
      this.hideTitleAndMenu()
    },
    selectTab (tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.slide-content-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 300;
  display: flex;
  width: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        flex: 0 0 px2rem(48);
        width: 100%;
        height: px2rem(48);
        display: flex;
        .content-page-tab-item {
          font-size: px2rem(16);
          flex: 1;
          @include center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
