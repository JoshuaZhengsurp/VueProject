<template>
    <div>
        <button @click="router.back()">返回</button>
        <h3>详情页面</h3>
    </div>
    <div>
        <div>品牌：{{ item?.name }}</div>
        <div>价格：{{ item?.price }}</div>
        <div>ID: {{ item?.id }}</div>
    </div>
</template>

<script setup lang="ts">
import { data } from '../JSON/list.json'
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const item = data.find(v=>v.id===Number(route.params.id));

onMounted(() => {
    console.log('params', route, route.params);
})

</script>

<style></style>