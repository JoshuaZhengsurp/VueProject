<template>
  <div class="top-nav">
    <ul>
      <li><router-link exact to="/">首页</router-link></li>
      <li><router-link to="/topic">榜单</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
      <li><router-link to="/mine">我的</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style scoped lang="less">
.top-nav{
  display: flex;
  background: #fff;
  // justify-content: space-around;
  ul{
    width: 750px;
    display: flex;
    justify-content: space-around;
    li{
      padding-top: 10px;
      flex:1;
      align-content: center;
      display: block;   
      a{
        text-align: center;
        display: block;
        padding-bottom: 8px;
      }
      .active{
        border-bottom: 2px solid #ff0000;
      } 
    }
  }
}
</style>