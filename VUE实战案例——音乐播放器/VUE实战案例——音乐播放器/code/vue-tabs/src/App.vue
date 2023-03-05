<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MyComponent />
    <tabs :defaultActiveKey='defaultActiveKey' @callback="updateKey">
      <tab label="tab1" index="1">
        <div>内容11</div>
      </tab>
      <tab label="tab2" index="2">
         <h3>用户自己填写的</h3>
      </tab>
      <tab label="tab3" index="3">
         <div>内容33</div>
      </tab>
    </tabs>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      defaultActiveKey:"1"
    }
  },
  components: {
  },
  methods:{
    updateKey(index){
      this.defaultActiveKey = index
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
