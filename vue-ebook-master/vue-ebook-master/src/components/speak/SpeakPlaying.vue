<template>
  <div class="playing-item-wrapper">
    <div
      class="playing-item"
      :style="item"
      v-for="(item, index) in styles"
      :key="index"
      ref="playingItem"
    ></div>
  </div>
</template>

<script>
import { px2rem } from '@/utils/utils'

export default {
  props: {
    number: Number
  },
  computed: {
    styles () {
      const styles = new Array(this.number)
      for (let i = 0; i < styles.length; i++) {
        styles[i] = {
          height: px2rem(this.random()) + 'rem'
        }
      }
      return styles
    }
  },
  methods: {
    startAnimation () {
      this.task = setInterval(() => {
        this.$refs.playingItem.forEach(item => {
          item.style.height = px2rem(this.random()) + 'rem'
        })
      }, 200)
    },
    stopAnimation () {
      if (this.task) {
        clearInterval(this.task)
      }
    },
    random () {
      return Math.ceil(Math.random() * 10)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.playing-item-wrapper {
  @include center;
  .playing-item {
    flex: 0 0 px2rem(2);
    width: px2rem(2);
    height: px2rem(1);
    background: $color-blue;
    margin-left: px2rem(2);
    transition: all 0.2s ease-in-out;
    &:first-child {
      margin: 0;
    }
  }
}
</style>
