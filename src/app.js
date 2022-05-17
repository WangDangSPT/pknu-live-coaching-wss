const {createServer} = require('http')
const Websocket = require('ws')
const compile = require('./helpers/c/exec')
const createUserDir = require('./config/createUserDir')
const appendCode = require('./helpers/c/appendC')
const express = require('express')
const { builtinModules } = require('module')

const app = express()
const server = createServer(app)
const wss = new Websocket.Server({server})
const port = 8001

wss.getID = ()=>{
    function generator(){
        return Math.floor((Math.random()+1)*0x10000).toString(16)
    }
    return generator()+generator()
}

wss.on('connection', socket =>{
    console.log('new client connected');
    //create new userID and create Directory for use
    socket.id = wss.getID()
    createUserDir.createDir(socket.id)

    socket.on('message', code=>{
        //message will be string, no need to parse JSON
        appendCode.appendCode(code,socket.id);
        console.log(`appended code : ${code}`);
    })


    socket.on('close', ()=>{
        console.log('user disconnected');
    })
})

server.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

module.exports = {app}
