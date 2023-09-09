<template>
    <div>
        <div>
            {{ str }}
        </div>
        <son1 @say1="fatherSay"></son1>
        <son2 @say2="fatherSay"></son2>
    </div>
</template>

<script>
import { ref } from 'vue'
import son1 from './components/son1.vue'
import son2 from './components/son2.vue'
export default {
    name: 'app',
    components: { son1, son2 },
    setup() {
        let str = ref('');
        let fatherSay = (data) => {
            str.value = data;
        }
        return {
            str,
            fatherSay,
        }
    }
}
</script>

<style></style>