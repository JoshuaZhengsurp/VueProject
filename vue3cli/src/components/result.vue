<template>
  <div style="display: flex;flex-direction: column;">
  <button ref="chartRef" @click="sendCsv"> 发送csv到线索</button>
  <button ref="chartRef" @click="sendJsonTovlue"> 发送json到线索</button>
  <button ref="chartRef" @click="sendJson"> 发送json输入框</button>
  <button ref="chartRef" @click="sendCsvTOinput"> 发送csv输入框</button>
  <button ref="chartRef" @click="sendQue"> 发送提示词</button>
  <button ref="chartRef" @click="sendPrompt"> 发送问题示例</button>
  <textarea></textarea>
</div>
</template>
<script setup>
import { QPAAP } from 'qqtip';

function sendCsv() {
  if(!QPAAP.checkQPAAPexist)return ;
  let csvData = 'Name,Age,Email\nJohn Doe,25,johndoe@example.com\nJane Smith,30,janesmith@example.com\nTom Johnson,35,tomjohnson@example.com'
  QPAAP.sendToAssistant({
    data: csvData,
    format: 'csv',
    type: 'original',
    consumer: 'clues'
})
}
function sendJsonTovlue() {
  if(!QPAAP.checkQPAAPexist)return ;
  let jsonData = JSON.stringify({
    "data": "Name", // string  数据
    "format": "csv", // 数据格式 枚举类型 json/csv
    "type": "chart", // 数据类型 图表数据： chart， 原始数据：original
    "consumer": "input" // 消费在哪里 输入框直接查询：input 作为线索：clues
})
  QPAAP.sendToAssistant({
    data: jsonData,
    format: 'json',
    type: 'chart',
    consumer: 'clues'
})
}
function sendCsvTOinput() {
  if(!QPAAP.checkQPAAPexist)return ;
  let csvData = 'Name,Age,Email\nJohn Doe,25,johndoe@example.com\nJane Smith,30,janesmith@example.com\nTom Johnson,35,tomjohnson@example.com'
  QPAAP.sendToAssistant({
    data: csvData,
    format: 'csv',
    type: 'original',
    consumer: 'input'
})
}
function sendJson() {
  if(!QPAAP.checkQPAAPexist)return ;
  let jsonData = JSON.stringify({
    "data": "Name,Age,City\nJohn,25,New York\nJane,30,San Francisco", // string  数据
    "format": "csv", // 数据格式 枚举类型 json/csv
    "type": "chart", // 数据类型 图表数据： chart， 原始数据：original
    "consumer": "input" // 消费在哪里 输入框直接查询：input 作为线索：clues
})
  QPAAP.sendToAssistant({
    data: jsonData,
    format: 'json',
    type: 'chart',
    consumer: 'input'
})
}
function sendQue() {

  QPAAP.setPrompt({
    type: 'prompt',
    data: [
      {
        title: "你好",
        content: "好的",
      },
      {
        title: "你好",
        content: "不好",
      }
    ]
  })
}
function sendPrompt(){

  QPAAP.setPrompt({
    type: 'question',
    data: [
      {
        title: "帮助我归因这个性能缺陷并给出解决方案",
        content: "帮助我归因这个性能缺陷并给出解决方案",
      },
      {
        title: "帮助我分析这段数据趋势中的异常并进行归因",
        content: "帮助我分析这段数据趋势中的异常并进行归因",
      }
    ]
  })
}



const type = 1;
</script>


<style scoped>

</style>