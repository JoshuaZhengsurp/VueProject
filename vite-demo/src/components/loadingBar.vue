<template>
    <div class="wraps">
        <div class="bar"></div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)
const statrLoading = ()=>{
    let dom = bar.value as HTMLElement
    console.log(dom);
    timer.value = window.requestAnimationFrame(function fn(){
        if(speed.value<90){
            speed.value += 1;
            dom.style.width = speed.value + '%';
            timer.value = window.requestAnimationFrame(fn); 
        }else{
            speed.value = 1;
            window.cancelAnimationFrame(timer.value);
        }
    })
}
const endLoading = ()=>{

}
onMounted(()=>{
    statrLoading();
})

defineExpose({
    statrLoading,
    endLoading
})
</script>

<style scoped lang="less">
.wraps{
    position: fixed;
    top: 0;
    width: 100%;
    height: 10px;
    .bar{
        height: inherit;
        width: 0;
        background-color: pink;
    }
}
</style>