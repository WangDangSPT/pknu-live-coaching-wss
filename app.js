const {createServer} = require('http')
const {WebSocketServer} = require('ws')
require('dotenv').config()

const appendCode = require('./helpers/appendCode')
const checkDir = require('./helpers/directory')

// for now we are using two seperate servers so we create a new HTTP server here
const server = createServer()
const wss = new WebSocketServer({server})
const port = process.env.PORT

wss.on('connection', (socket,req) =>{
    socket.on('message', messsage=>{
        const {id,data} = JSON.parse(message);
        // check if user dir exists, if not make dir
        checkDir(id)
        // append code
        appendCode(data,Number(id))
        socket.send(JSON.stringify({id: id, data: `appended code : ${data}`}))
    })
    socket.on('close',code=>{
        console.log(`user disconnected with code : ${code}`)
    })
})

server.listen(port, ()=> {
    console.log(`server is listening on: ${port}`);
})

