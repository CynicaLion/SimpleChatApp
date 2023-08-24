document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const emojiMapping = {
    "React": "🌟",
    "Woah": "😯",
    "Hey": "👋",
    "Lol": "😂",
    "Like":  "🤍",
    "Congratulations": "🎉",



 };

    sendButton.addEventListener('click', () => {
        let message = messageInput.value; 

        for (const keyword in emojiMapping) {
            if (message.includes(keyword)) {
                message = message.replace(keyword, emojiMapping[keyword]);
            }
        }

        if (message.trim() !== '') {
            socket.emit('chat message', message);
            messageInput.value = ''; // Clear the input field after sending
        }
    });

    socket.on('chat message', (msg) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});