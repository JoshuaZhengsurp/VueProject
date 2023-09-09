<template>
  <div class="main_app">
    <div class="chat">
      <div class="chat-header">
        <h2>Chat Room</h2>
      </div>
      <div class="chat-message">Joshua：你不说话，我就不说话</div>
      <div v-for="(chatlog, index) in chatlogs" :key="index" class="chat-messages">
        <div class="chat-message">
          <span v-if="!(index % 2)">Me: {{ chatlog }}</span>
          <span v-if="index % 2">Joshua: {{ chatlog }}</span>
        </div>
      </div>
    </div>
    <form class="chat-input">
      <input type="text" v-model="query">
      <button @click="summitQuery">Send</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'popupView',
  data() {
    return {
      chatlogs: [],
      query: "",
      // result:{},
    }
  },
  methods: {
    summitQuery() {
      this.chatlogs.push(this.query);
      const params = new URLSearchParams({
        key: "free",
        appid: 0,
        msg: this.query
      })
      console.log(this.query);
      axios.get(`http://api.qingyunke.com/api.php`, { params })
        .then(response => {
          // this.result = response.data;
          console.log(response.data);
          this.chatlogs.push(response.data.content);
        })
        .catch(error => {
          this.error = error;
        })
      this.query = ""
      setTimeout(()=>{},5000);
    }
  },
}

</script>

<style>
      .main_app {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
      }
      .chat {
        max-width: 500px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .chat-header {
        background-color: #333;
        color: #fff;
        padding: 10px;
        text-align: center;
      }
      .chat-messages {
        height: 300px;
        overflow-y: scroll;
        padding: 10px;
      }
      .chat-message {
        margin-bottom: 10px;
      }
      .chat-message strong {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .chat-message p {
        margin: 0;
      }
      .chat-input {
        display: flex;
        align-items: center;
        background-color: #eee;
        padding: 10px;
      }
      .chat-input input[type="text"] {
        flex-grow: 1;
        margin-right: 10px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .chat-input button[type="submit"] {
        padding: 5px 10px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
</style>
