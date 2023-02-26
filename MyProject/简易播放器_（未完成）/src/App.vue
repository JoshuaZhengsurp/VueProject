<template>
    <div id="app">
        <!-- <div>!!!</div> -->
        <!-- <router-link active-class="active" to="/home">home</router-link> -->
        <transition>
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
    // width: 100%;
    // height: 100%;
}
a {
  text-decoration: inherit;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4 {
  font: inherit;
}
input,
select,
button {
  font: inherit;
}
html,
body {
  height: 100%;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>