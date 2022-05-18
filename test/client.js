const websocket = new WebSocket('ws://localhost:8001')
const formSubmit = document.getElementById('form-container')
const messageInput = document.getElementById('message-container')
const messageScreen = document.getElementById('screen-container')

formSubmit.addEventListener('submit', e =>{
    e.preventDefault()
    let message = messageInput.value
    websocket.send(message)
    showMessage(message)
    messageInput.value = ''
})
function showMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageScreen.append(messageElement)
    console.log(message);
}