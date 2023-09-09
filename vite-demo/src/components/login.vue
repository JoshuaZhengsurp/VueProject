<template>
    <table>
        <thead>
            <tr>
                <th>品牌</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in data" :key="item.id">
                <th>{{ item.name }}</th>
                <th>{{ item.price }}</th>
                <th>
                    <button @click="toDetail(item)">详情</button>
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { data } from '../JSON/list.json'
import { useRouter } from 'vue-router'
type Item = {
    name: string;
    price: number;
    id: number;
}
const router = useRouter();
const toDetail = (item: Item) => {
    router.push({
        name: 'Reg',
        path: '/reg',
        params: {
            id: item.id
        }
    })
}
</script>

<style></style>