<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const jumpToLogin = () => {
  router.push('/login');
}
const jumpToReg = () => {
  router.push({
    name: 'Reg',
    // path: '/reg',
  })
}
const next = () => {
  router.go(1);
}
const pre = () => {
  router.back();
}
const replaceLogin = (url: string) => {
  router.replace(url);
}
</script>

<template>
  <div>
    <h1>JOSHUA's VUE ROUTER</h1>
    <!-- <router-link replace to="/">jumpToLogin</router-link> -->
    <!-- <router-link style="margin-left: 10px;" :to="{name: 'Reg'}">jumpToReg</router-link> -->
    <div class="buttons">
      <button @click="jumpToLogin">jumpToLogin</button>
      <button @click="jumpToReg">jumpToReg</button>
      <button @click="pre">go back</button>
      <button @click="next">forward</button>
      <button @click="replaceLogin('/')">replace</button>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.buttons button {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
