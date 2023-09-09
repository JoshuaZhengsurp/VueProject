<template>
  <button @click="say">QAQ1</button>
</template>

<script>
export default {
    emits:['say1'],
    setup(props,{emit}){
        let say=()=>{
            emit('say1',"nmd");
        }
        return {
            say,
        }
    }
}
</script>

<style>

</style>