const {createServer} = require('http')
const Websocket = require('ws')
const compile = require('./helpers/c/exec')

const server = createServer()
const wss = new Websocket.Server({server})

wss.on('connection', socket =>{
    console.log('new client connected');
    socket.on('message', message=>{
        const data = JSON.parse(message)
        //events 
        if(data.event === 'user-code'){
            console.log(data.payload);
            wss.clients.forEach(client =>{
                if (client !== socket && client.readyState === Websocket.OPEN) {
                client.send(message)
                }
            })
        }
        if(data.event === 'compile'){
            // add async function that calls compile method when sent here
            let output = JSON.stringify({ event: 'compile', payload: compile(data.payload) })
            
            //send output to all clients
            wss.clients.forEach(client =>{
                if(client.readyState === Websocket.OPEN){client.send(output)}
            })
        }
    })
    socket.on('close', ()=>{
        console.log('user disconnected');
    })
})

server.listen(8001, ()=> {
    console.log('listening on port: 8001');
})

