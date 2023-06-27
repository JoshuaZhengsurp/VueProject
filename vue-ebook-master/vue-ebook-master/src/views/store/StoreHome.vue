<template>
  <div class="store-home">
    <SearchBar @recommendBook="recommendBook"></SearchBar>
    <FlapCard :data="random"></FlapCard>
    <Scroll
      :top="scrollTop"
      @onScroll="onScroll"
      ref="scroll"
    >
      <div class="banner-wrapper">
        <img
          :src="banner"
          class="banner-img"
          alt="banner图"
        >
      </div>
      <GuessYouLike
        :data="guessYouLike"
        class="guessYouLike"
      ></GuessYouLike>
      <Recommend
        :data="recommend"
        :class="recommend"
      ></Recommend>
      <Featured
        :data="featured"
        :titleText="$t('home.featured')"
        :btnText="$t('home.seeAll')"
        :titleVisible="true"
        :class="featured"
      ></Featured>
      <div
        class="category-list-wrapper"
        v-for="(item, index) in categoryList"
        :key="index"
      >
        <CategoryBook
          :data="item"
          class="categoryBook"
        ></CategoryBook>
      </div>
      <Category
        :data="categories"
        class="categories"
      ></Category>
    </Scroll>
  </div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import FlapCard from '../../components/home/FlapCard'
import GuessYouLike from '../../components/home/GuessYouLike'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook'
import Category from '../../components/home/Category'
import { storeHomeMixin } from '../../utils/mixin'
import { home } from '../../api/store'
export default {
  mixins: [storeHomeMixin],
  components: {
    SearchBar, Scroll, FlapCard, GuessYouLike, Recommend, Featured, CategoryBook, Category
  },
  mounted () {
    console.log('scrollTop', this.scrollTop)
    this.$refs.scroll.refresh()
    this.recommendBook()
  },
  data () {
    return {
      scrollTop: 94,
      // 随机推荐的一本图书
      random: null,
      // 首页的banner
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY === 0) {
        console.log('我等于0了')
        this.scrollTop = 94
        // BUG Scrool组件的高度，不会变，导致下面部分突出
      }
      if (offsetY > 0) {
        this.scrollTop = 52
      }
      // 重新计算高度
      this.$refs.scroll.refresh()
      // console.log(this.$refs.scroll.$el.style.height)
    },
    // 点击右上角图标，随机推荐一本书,从子组件拿过来的方法
    async recommendBook () {
      // TODO 待优化：最好存一下缓存，减少网络开支
      const { data } = await home()
      if (data) {
        const randomIndex = Math.floor(Math.random() * data.random.length)
        // 生成随机推荐的一本书
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: 0 px2rem(7);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
    }
  }
  .guessYouLike {
    margin-top: px2rem(10);
  }
  .recommend {
    margin-top: px2rem(10);
  }
  .featured {
    margin-top: px2rem(20);
  }
  .category-list-wrapper {
    margin-top: px2rem(20);
    .categoryBook {
    }
  }
  .categories {
    margin-top: px2rem(20);
  }
}
</style>
