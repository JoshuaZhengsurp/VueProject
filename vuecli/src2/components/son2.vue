<template>
    <button @click="say">QAQ1</button>
  </template>
  
  <script>
  export default {
      emits:['say2'],
      setup(props,{emit}){
          let say=()=>{
              emit('say2',"byd");
          }
          return {
              say,
          }
      }
  }
  </script>
  
  <style>
  
  </style>