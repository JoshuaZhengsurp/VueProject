<template>
  <div style="display: flex;flex-direction: column;">
    <button ref="chartRef" @click="sendCsv"> 发送csv到线索</button>
    <button ref="chartRef" @click="sendJsonTovlue"> 发送json到线索</button>
    <button ref="chartRef" @click="sendJson"> 发送json输入框</button>
    <button ref="chartRef" @click="sendCsvTOinput"> 发送csv输入框</button>
    <button ref="chartRef" @click="sendQue"> 发送提示词</button>
    <button ref="chartRef" @click="sendPrompt"> 发送问题示例</button>
    <textarea @input="deprint(10)"></textarea>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { QPAAP } from 'qqtip';
// import { sdkPrompt } from 'sztu-prompt-sdk';
//防抖函数
function print(int) {
  console.log(int);
}
const deprint = debounce(print, 1000);
function debounce(fn, delay) {
  let timer = null;
  let firstInvoke = true;
  return function () {
    if (firstInvoke) {
      fn.apply(this, arguments)
      firstInvoke = false;
    }
    else {

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}
function sendCsv() {
  if (!QPAAP.checkQPAAPexist) return;
  let csvData = 'Name,Age,Email\nJohn Doe,25,johndoe@example.com\nJane Smith,30,janesmith@example.com\nTom Johnson,35,tomjohnson@example.com'
  QPAAP.sendToAssistant({
    "format": "csv",
    "type": "original",
    "consumer": "bugfix",
    "data": csvData
    //"by_dimension,cnt,dimension,dimension_name,dimension_value,fluency,rank_cnt,scene_cnt,time,total_cnt,total_scene_cnt\r\n\"model,MI 5X\",504,device,model,MI 5X,0.9046565787783021,1,504,1691510400000,1440,1440\r\n\"model,vivo X9L\",468,device,model,vivo X9L,0.9040487969991955,2,468,1691510400000,1440,1440\r\n\"model,Nexus 5X\",468,device,model,Nexus 5X,0.9036693837744039,3,468,1691510400000,1440,1440\r\n\"os_ver,10\",234,os,os_ver,10,0.9031015318748858,1,234,1691510400000,1440,1440\r\n\"os_ver,12\",198,os,os_ver,12,0.9082325804070969,2,198,1691510400000,1440,1440\r\n\"os_ver,7\",198,os,os_ver,7,0.9017436925718607,3,198,1691510400000,1440,1440\r\n\"os_ver,9\",180,os,os_ver,9,0.9043498133486224,4,180,1691510400000,1440,1440\r\n\"os_ver,13\",180,os,os_ver,13,0.9060502590282349,5,180,1691510400000,1440,1440\r\n\"os_ver,8\",162,os,os_ver,8,0.9057175872014905,6,162,1691510400000,1440,1440\r\n\"os_ver,6\",144,os,os_ver,6,0.9001761876183025,7,144,1691510400000,1440,1440\r\n\"os_ver,11\",144,os,os_ver,11,0.9030461642181472,8,144,1691510400000,1440,1440\r\n\"version,4.9.8\",72,version,version,4.9.8,0.9027031368691713,1,72,1691510400000,1440,1440\r\n\"version,4.5.5\",54,version,version,4.5.5,0.903842281488707,2,54,1691510400000,1440,1440\r\n\"version,4.8.9\",54,version,version,4.8.9,0.9045698106056761,3,54,1691510400000,1440,1440\r\n\"version,4.6.9\",54,version,version,4.6.9,0.8997146857411341,4,54,1691510400000,1440,1440\r\n\"version,4.1.5\",54,version,version,4.1.5,0.9016646479814328,5,54,1691510400000,1440,1440\r\n\"version,4.2.3\",36,version,version,4.2.3,0.9095403631630568,6,36,1691510400000,1440,1440\r\n\"version,4.1.9\",36,version,version,4.1.9,0.906240925903685,7,36,1691510400000,1440,1440\r\n\"version,4.1.2\",36,version,version,4.1.2,0.9062590070202562,8,36,1691510400000,1440,1440\r\n\"version,4.5.1\",36,version,version,4.5.1,0.8987088789910678,9,36,1691510400000,1440,1440\r\n\"version,4.4.1\",36,version,version,4.4.1,0.9137256040241457,10,36,1691510400000,1440,1440\r\n\"version,4.7.6\",36,version,version,4.7.6,0.9112653825902127,11,36,1691510400000,1440,1440\r\n\"version,4.2.8\",36,version,version,4.2.8,0.9019521888843165,12,36,1691510400000,1440,1440\r\n\"version,4.9.2\",36,version,version,4.9.2,0.9049930397088789,13,36,1691510400000,1440,1440\r\n\"version,4.2.6\",36,version,version,4.2.6,0.8991816646897921,14,36,1691510400000,1440,1440\r\n\"version,4.1.8\",36,version,version,4.1.8,0.9002344008456182,15,36,1691510400000,1440,1440\r\n\"version,4.7.9\",36,version,version,4.7.9,0.9017878091780573,16,36,1691510400000,1440,1440\r\n\"version,4.9.7\",36,version,version,4.9.7,0.9129935847100388,17,36,1691510400000,1440,1440\r\n\"version,4.4.6\",36,version,version,4.4.6,0.909244372744744,18,36,1691510400000,1440,1440\r\n\"version,4.1.3\",36,version,version,4.1.3,0.9044799494460398,19,36,1691510400000,1440,1440\r\n\"version,4.6.7\",36,version,version,4.6.7,0.8991590133869684,20,36,1691510400000,1440,1440\r\n\"version,4.7.2\",36,version,version,4.7.2,0.8978074342588334,21,36,1691510400000,1440,1440\r\n\"version,4.7.8\",36,version,version,4.7.8,0.896729482865742,22,36,1691510400000,1440,1440\r\n\"version,4.4.5\",36,version,version,4.4.5,0.9098167216243349,23,36,1691510400000,1440,1440\r\n\"version,4.2.2\",18,version,version,4.2.2,0.8935901858262125,24,18,1691510400000,1440,1440\r\n\"version,4.4.9\",18,version,version,4.4.9,0.9199000278040032,25,18,1691510400000,1440,1440\r\n\"version,4.3.5\",18,version,version,4.3.5,0.8933569448815085,26,18,1691510400000,1440,1440\r\n\"version,4.1.4\",18,version,version,4.1.4,0.911408603760364,27,18,1691510400000,1440,1440\r\n\"version,4.2.1\",18,version,version,4.2.1,0.9123697769467132,28,18,1691510400000,1440,1440\r\n\"version,4.4.3\",18,version,version,4.4.3,0.8994022980158635,29,18,1691510400000,1440,1440\r\n\"version,4.4.8\",18,version,version,4.4.8,0.9033989131224129,30,18,1691510400000,1440,1440\r\n\"version,4.4.2\",18,version,version,4.4.2,0.8924365887213251,31,18,1691510400000,1440,1440\r\n\"version,4.4.7\",18,version,version,4.4.7,0.8969627238104461,32,18,1691510400000,1440,1440\r\n\"version,4.3.2\",18,version,version,4.3.2,0.9074938917762276,33,18,1691510400000,1440,1440\r\n\"version,4.8.4\",18,version,version,4.8.4,0.9097408728012686,34,18,1691510400000,1440,1440\r\n\"version,4.6.2\",18,version,version,4.6.2,0.9075575456296283,35,18,1691510400000,1440,1440\r\n\"version,4.3.9\",18,version,version,4.3.9,0.9150114118628376,36,18,1691510400000,1440,1440\r\n\"version,4.3.4\",18,version,version,4.3.4,0.9022705312547908,37,18,1691510400000,1440,1440\r\n\"version,4.5.3\",18,version,version,4.5.3,0.9013385641523903,38,18,1691510400000,1440,1440\r\n\"version,4.8.3\",18,version,version,4.8.3,0.9043430260328983,39,18,1691510400000,1440,1440\r\n\"version,4.6.5\",18,version,version,4.6.5,0.8974859399837009,40,18,1691510400000,1440,1440\r\n\"version,4.6.4\",18,version,version,4.6.4,0.8997090255053353,41,18,1691510400000,1440,1440\r\n\"version,4.3.7\",18,version,version,4.3.7,0.906588640636473,42,18,1691510400000,1440,1440\r\n\"version,4.8.8\",18,version,version,4.8.8,0.9061062377720949,43,18,1691510400000,1440,1440\r\n\"version,4.8.6\",18,version,version,4.8.6,0.8946996562658855,44,18,1691510400000,1440,1440\r\n\"version,4.9.5\",18,version,version,4.9.5,0.9182895853129682,45,18,1691510400000,1440,1440\r\n\"version,4.2.4\",18,version,version,4.2.4,0.9059519558955242,46,18,1691510400000,1440,1440\r\n\"version,4.8.5\",18,version,version,4.8.5,0.9043748529595986,47,18,1691510400000,1440,1440\r\n\"version,4.9.1\",18,version,version,4.9.1,0.90750269298734,48,18,1691510400000,1440,1440\r\n\"version,4.7.4\",18,version,version,4.7.4,0.9040311221512355,49,18,1691510400000,1440,1440\r\n\"version,4.8.2\",18,version,version,4.8.2,0.9077739687311903,50,18,1691510400000,1440,1440\r\n\"version,4.7.5\",18,version,version,4.7.5,0.9008584779679344,51,18,1691510400000,1440,1440"
  }
  )
}
function sendJsonTovlue() {
  if (!QPAAP.checkQPAAPexist) return;
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
    consumer: 'bugfix'
  })
}
function sendCsvTOinput() {
  if (!QPAAP.checkQPAAPexist) return;
  let csvData = 'Name,Age,Email\nJohn Doe,25,johndoe@example.com\nJane Smith,30,janesmith@example.com\nTom Johnson,35,tomjohnson@example.com'
  QPAAP.sendToAssistant({
    data: csvData,
    format: 'csv',
    type: 'original',
    consumer: 'input'
  })
}
function sendJson() {
  if (!QPAAP.checkQPAAPexist) return;
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
function sendPrompt() {

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



const prompts = [
  {
    title: '寄1',
    content: 'gg'
  },
  {
    title: '寄2',
    content: 'gg'
  },
  {
    title: '寄3',
    content: 'gg'
  },
  {
    title: '寄4',
    content: 'gg'
  },
  {
    title: '寄4',
    content: 'gg'
  },
  {
    title: '寄5',
    content: 'gg'
  },
  {
    title: '寄6',
    content: 'gg'
  },
  {
    title: '寄7',
    content: 'gg'
  },

  {
    title: '寄8',
    content: 'gg'
  },
  {
    title: '寄9',
    content: 'gg'
  },
  {
    title: '寄10',
    content: 'gg'
  },
  {
    title: '寄11',
    content: 'gg'
  },
  {
    title: '寄12',
    content: 'gg'
  },
  {
    title: '寄13',
    content: 'gg'
  },
  {
    title: '寄14',
    content: 'gg'
  },
  {
    title: '寄15',
    content: 'gg'
  },

  {
    title: '寄16',
    content: 'gg'
  },
  {
    title: '寄17',
    content: 'gg'
  },
  {
    title: '寄18',
    content: 'gg'
  },

  {
    title: '寄19',
    content: 'gg'
  },
  {
    title: '寄20',
    content: 'gg'
  },
  {
    title: '寄寄',
    content: 'gg'
  },
  {
    title: '寄寄',
    content: 'gg'
  },
]
onMounted(() => {
  QPAAP.setPrompt({type: 'prompt', data: prompts})
})

</script>


<style scoped></style>