<template>
    <div>
        <!-- <div>!!!</div> -->
        <!-- <router-link active-class="active" to="/home">home</router-link> -->
        <!-- <transition> -->
        <router-view></router-view>
        <!-- </transition> -->
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
    width: 100%;
    height: 100%;
}
</style>