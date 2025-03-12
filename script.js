function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);
const socket = io(); // Connect to the backend

function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Display user's message
        const userBubble = document.createElement("div");
        userBubble.className = "chat-message user";
        userBubble.textContent = `You: ${userMessage}`;
        chatBox.appendChild(userBubble);

        // Emit the message to the server
        socket.emit('chat message', userMessage);

        // Auto-scroll chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear user input
        userInput.value = "";
    }
}

// Listen for incoming messages
socket.on('chat message', (msg) => {
    const chatBox = document.getElementById("chatBox");
    const botBubble = document.createElement("div");
    botBubble.className = "chat-message bot";
    botBubble.textContent = msg;
    chatBox.appendChild(botBubble);

    // Auto-scroll chat box
    chatBox.scrollTop = chatBox.scrollHeight;
});
