const { exec } = require('child_process')
const {createServer} = require('http')
const websocket = require('ws')
const compile = require('./exec')

const server = createServer()
const wss = new websocket.server({server})

wss.on('connection', socket =>{
    //user types code event, sends typed code to other clients
    socket.on('user-code', code=>{
        wss.clients.forEach(client =>{
            if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(code)
            }
        })
    })
    socket.on('compile-code',source =>{
        
        //code async function that accepts source file here
        
        wss.clients.forEach(client =>{
            if(client.readyState === WebSocket.OPEN){client.send(output)}
        })
    })
})

server.listen(8001, ()=> {
    console.log('listening on port: 8001');
})

