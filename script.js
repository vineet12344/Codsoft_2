const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById("message-container");

const name = prompt('Kimi no Nawa?');
appendMesage('You Joined');

socket.emit('new-user',name);

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Listen for custom events from the server
socket.on('chat-message', (data) => {
    appendMesage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', (name) => {
    appendMesage(`${name} connected`);
});

socket.on('user-disconnected', (name) => {
    appendMesage(`${name} disconnected`);
});

messageForm.addEventListener('submit',e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMesage(`YOU: ${message}`)
    socket.emit('send-chat-message',message);
    messageInput.value = '';
});


function appendMesage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}