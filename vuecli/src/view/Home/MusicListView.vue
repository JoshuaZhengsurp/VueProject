<template>
  <div class="collection-block"> 
    <div class="block-padding">
      <div class="title"><!-- 标题 -->
        <h3>新歌榜</h3>
        <a href="#">更多</a>
      </div>
      <div class="list clear-padding">
        <div class="item">
            <div class="img-warpper">
                <img src="../../assets/image/favicon.png">
            </div>
            <div class="main">歌名</div>
            <div class="gary">歌手</div>
        </div>
        <div class="item">
            <div class="img-warpper">
                <img src="../../assets/image/favicon.png">
            </div>
            <div class="main">歌名</div>
            <div class="gary">歌手</div>
        </div>
        <div class="item">
            <div class="img-warpper">
                <img src="../../assets/image/favicon.png">
            </div>
            <div class="main">歌名</div>
            <div class="gary">歌手</div>
        </div>
        <div class="item">
            <div class="img-warpper">
                <img src="../../assets/image/favicon.png">
            </div>
            <div class="main">歌名</div>
            <div class="gary">歌手</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.collection-block{
  // height: 700px;
  margin-top: 5px;
  background: #fff;
  height: auto;
  .block-padding{
    padding: 10px 17px;
    .title{
      display: flex;
      margin: 14px 0 18px;
      h3{
        flex:1 1 0%;
        font-size: 20px;
        font-weight: 700;
        display: block;
        float: left;
      }
      a{
        // right: 0;
        clear:left;
      }
    }
    .list{
      // display: flex;
      width: 100%;
      height: auto;
      overflow: hidden;
      .item{
        // flex:1;
        float: left;
        width: 30%;
        padding: 0px 6px;
        // margin: 0%;
        margin-bottom: 10px;
      }
      .main{
        margin-top: 4px;
        font-size: 12px;
      }
      .gray{
        font-size: 12px;
        color:#999
      }
      // clear:left
    }
    // clear:left
  }
}
</style>
