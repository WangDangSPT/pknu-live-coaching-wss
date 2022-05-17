const websocket = new WebSocket('ws://localhost:8001')
const formSubmit = document.getElementById('form-container') // changed id namings, must change handler namings too
let messageInput = document.getElementById('message-container')
const messageScreen = document.getElementById('screen-container')
const compileButton = document.getElementById('compile-button')

websocket.addEventListener('open', event =>{
    console.log('connected to websocket server');
})
websocket.addEventListener('message', event=>{
    //const data = JSON.parse(event)
    // showMessage(data.payload)
    console.log(`message from other client : ${event.data}`);
})
formSubmit.addEventListener('submit', e =>{
    e.preventDefault();
    let message = messageInput.value
    websocket.send(message)
    messageInput.value = ''
})
// function showMessage(message){
//     let messageElement = document.createElement('div')
//     messageElement.innerText = message
//     messageScreen.append(messageElement)
// }

compileButton.addEventListener('compile', ()=>{
    let message = JSON.stringify({ event: 'compile', payload: messageInput.value })
    websobsocket.send(message)
})