<template>
    <div>
        <!-- <div>!!!</div> -->
        <router-link active-class="active" to="/home">home</router-link>
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

<style>
</style>