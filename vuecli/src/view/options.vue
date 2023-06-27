<template>
    <div class="main">
        <div class="chat">
            <div class="chat-header">
                <h2>Chat Room</h2>
            </div>
            <div class="chat-messages">
                <div class="chat-message">
                    <strong>User1:</strong>
                    <p>Hello!</p>
                </div>
                <div class="chat-message">
                    <strong>User2:</strong>
                    <p>Hi there!</p>
                </div>
            </div>
            <form class="chat-input">
                <input type="text" placeholder="Type your message...">
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.main {
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