<template>
  <div
    class="flap-card-wrapper"
    v-show="flapcardVisible"
  >
    <!-- 外围圆角方形，外白色，里翻转动画 -->
    <div
      class="flap-card-bg"
      :class="{'animation':runFlapCardAnimation}"
      v-show="runFlapCardAnimation"
    >
      <div
        class="flap-card"
        v-for="(item, index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <!-- 里面旋转、翻转动画、 -->
        <div class="flap-card-circle">
          <div
            class="flap-card-semi-circle
          flap-card-semi-circle-left"
            :style="semiCircleStyle(item,'left')"
            ref="left"
          ></div>
          <div
            class="flap-card-semi-circle
          flap-card-semi-circle-right"
            :style="semiCircleStyle(item,'right')"
            ref="right"
          ></div>
        </div>
      </div>
    </div>
    <!-- 推荐的图书 -->
    <div
      class="book-card"
      :class="{'animation':runBookCardAnimation}"
      v-show="runBookCardAnimation"
    >
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img
            :src="data?data.cover:''"
            class="img"
            alt="图书封面图"
          >
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data?data.title:''}}</div>
          <div class="content-author sub-title-medium">{{data?data.author:''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div
          class="read-btn"
          @click.stop="showBookDetail(data)"
        >
          <!-- .stop是阻止事件冒泡 -->
          {{$t('home.readNow')}}
        </div>
      </div>
    </div>
    <!-- 烟花动画 -->
    <div
      class="point-wrapper"
      v-show="runPointAnimation"
    >
      <div
        class="point"
        v-for="(item, index) in pointList"
        :key="index"
        :class="{'animation':runPointAnimation}"
      ></div>
    </div>
    <!-- 底部的关闭按钮 -->
    <div
      class="close-btn-wrapper"
      @click="close"
    >
      <span class="iconfont icon-close"></span>
    </div>
  </div>
</template>

<script>
import { storeHomeMixin } from '../../utils/mixin'
import { flapCardList, categoryText } from '../../utils/store'
export default {
  mixins: [storeHomeMixin],
  props: {
    data: Object
  },
  data () {
    return {
      flapCardList,
      front: 0,
      back: 1,
      // 旋转的时间间隔，值越小旋转速度越快
      intervalTime: 20,
      // 控制显示中心的翻转动画
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false
    }
  },
  watch: {
    // 监听flapcard组件的显示与否
    flapcardVisible (v) {
      if (v) {
        this.runAnimation()
        console.log(this.data)
      }
    }
  },
  created () {
    this.pointList = []
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`)
    }
  },
  mounted () {
  },
  methods: {
    close () {
      // 点击加载动画下方关闭按钮
      this.setFlapcardVisible(false)
      this.stopAnimation()
    },
    categoryText () {
      if (this.data) {
        return categoryText(this.data.category, this)
      } else {
        return ''
      }
    },
    // 下面是关于动画的一些方法，与业务逻辑没关系
    semiCircleStyle (item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight,
        zIndex: item.zIndex
      }
    },
    runAnimation () {
      this.runFlapCardAnimation = true
      this.timeout = setTimeout(() => {
        this.startFlapCardAnimationn()
        this.startPointAnimation()
      }, 300)
    },
    // 动画效果,rotate:旋转
    rotate (index, type) {
      const item = this.flapCardList[index]
      let dom
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`
    },
    flapCardRotate () {
      const frontFlaCard = this.flapCardList[this.front]
      const backFlaCard = this.flapCardList[this.back]
      frontFlaCard.rotateDegree += 10
      frontFlaCard._g -= 5
      backFlaCard.rotateDegree -= 10
      if (backFlaCard.rotateDegree < 90) {
        backFlaCard._g += 5
      }
      if (frontFlaCard.rotateDegree === 90 && backFlaCard.rotateDegree === 90) {
        backFlaCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      if (frontFlaCard.rotateDegree === 180 && backFlaCard.rotateDegree === 0) {
        this.next()
      }
    },
    next () {
      const frontFlaCard = this.flapCardList[this.front]
      const backFlaCard = this.flapCardList[this.back]
      frontFlaCard.rotateDegree = 0
      backFlaCard.rotateDegree = 0
      frontFlaCard._g = frontFlaCard.g
      backFlaCard._g = backFlaCard.g
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      this.front++
      this.back++
      const len = this.flapCardList.length
      if (this.front >= len) {
        this.front = 0
      }
      if (this.back >= len) {
        this.back = 0
      }
      // 动态设置zIndex，100-96，99-100，98-99。。。
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len)
      })
      this.prepare()
    },
    prepare () {
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.back, 'back')
    },
    // 开始旋转动画
    startFlapCardAnimationn () {
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.intervalTime)
      // 下面的2500延时，是模拟接收到数据(获取推荐图书)
      this.timeout2 = setTimeout(() => {
        this.stopAnimation()
        this.startBookCardAnimation()
        // 模拟数据获取完成，下面显示推荐框
      }, 1000)
    },
    // 关闭后重置
    reset () {
      this.front = 0
      this.back = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
      this.runFlapCardAnimation = false
      this.runBookCardAnimation = false
      this.runPointAnimation = false
    },
    // 关闭进入翻转动画
    stopAnimation () {
      if (this.task) {
        clearInterval(this.task)
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.timeout2) {
        clearTimeout(this.timeout2)
      }
      this.reset()
    },
    // 开始烟花动画
    startPointAnimation () {
      this.runPointAnimation = true
      // 0.75秒后结束烟花效果，0.75是一次烟花效果执行需要的时间
      setTimeout(() => {
        this.runPointAnimation = false
      }, 750)
    },
    startBookCardAnimation () {
      this.runBookCardAnimation = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
@import '@/assets/styles/flapCard.scss';
.flap-card-wrapper {
  @include absCenter;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba($color: #000000, $alpha: 0.6);
  @include center;
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    border-radius: px2rem(5);
    background: #fff;
    transform: scale(0);
    opacity: 0;
    &.animation {
      animation: flap-card-move 0.3s ease-in both;
    }
    // 刚开始进入翻转加载的动画效果
    @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      70% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .flap-card {
      width: px2rem(48);
      height: px2rem(48);
      @include absCenter;
      .flap-card-circle {
        display: flex;
        width: 100%;
        height: 100%;
        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          // 背面可见性
          backface-visibility: hidden;
          &.flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right;
            // 旋转的中心轴
            transform-origin: right;
          }
          &.flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            transform-origin: left;
          }
        }
      }
    }
  }
  .book-card {
    position: relative;
    width: 65%;
    max-width: px2rem(400);
    box-sizing: border-box;
    border-radius: px2rem(15);
    background: #fff;
    &.animation {
      animation: scale 0.3s ease-in both;
      @keyframes scale {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .book-card-wrapper {
      width: 100%;
      height: 100%;
      margin-bottom: px2rem(50);
      @include columnTop;
      .img-wrapper {
        width: 100%;
        margin-top: px2rem(15);
        @include center;
        .img {
          width: px2rem(90);
          height: px2rem(130);
        }
      }
      .content-wrapper {
        padding: 0 px2rem(20);
        margin-top: px2rem(15);
        .content-title {
          color: #333;
          font-weight: bold;
          font-size: px2rem(18);
          line-height: px2rem(20);
          text-align: center;
          @include ellipsis2(2);
        }
        .content-author {
          text-align: center;
          margin-top: px2rem(10);
          @include ellipsis2(1);
        }
        .sub-title-medium {
        }
        .content-category {
          color: #999;
          font-size: px2rem(14);
          margin-top: px2rem(10);
          line-height: px2rem(16);
          text-align: center;
        }
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 px2rem(15) px2rem(15);
        padding: px2rem(15) 0;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        font-size: px2rem(14);
        background: $color-blue;
      }
    }
  }
  .point-wrapper {
    @include absCenter;
    .point {
      border-radius: 50%;
      @include absCenter;
      &.animation {
        @for $i from 1 to length($moves) {
          &:nth-child(#{$i}) {
            @include move($i);
          }
        }
      }
    }
  }
  .close-btn-wrapper {
    position: absolute;
    bottom: 15%;
    left: 50%;
    width: px2rem(50);
    height: px2rem(50);
    transform: translate(-50%, 50%);
    background: #333;
    border-radius: 50%;
    @include center;
    .icon-close {
      color: #fff;
    }
  }
}
</style>
