const {createServer} = require('http')
const Websocket = require('ws')
const {exec} = require('child_process')
const express = require('express')

const compile = require('./helpers/c/exec')
const createUserDir = require('./helpers/createUserDir')
const appendCode = require('./helpers/appendCode')

const app = express()
const server = createServer(app)
const wss = new Websocket.Server({server})
const port = 8001

// client id generator
wss.getID = ()=>{
    function generator(){
        return Math.floor((Math.random()+1)*0x10000).toString(16)
    }
    return generator()+generator()
}

wss.on('connection', socket =>{
    console.log('new client connected')
    //create new userID and create Directory for use
    socket.id = wss.getID()
    //send generated userID to user
    socket.send(socket.id);
    // create userDir
    createUserDir.createDirSync(socket.id)

    socket.on('message', data=>{
        //message will be string, no need to parse JSON
        appendCode.appendCode(data,socket.id)
        console.log(`appended code : ${data}`)
    })
    socket.on('close',code=>{
        console.log(`user disconnected with code : ${code}`)
    })
})

app.get('/getDir/:id',async (req,res)=>{
    const { id } = req.params
    //user data path in linux
    const path = `/var/lib/capstonedata/${id}`
    //windows test path
    //const pathWin = `dir`
    try{
        let output = await lsDir()
        res.status(200).send(output) 
    }catch(error){
        res.status(404).send(error)
    }
})
const lsDir = ()=>{
    return new Promise((resolve,reject)=>{
        exec(`${path}`,(err,stdout,stderr)=>{
            if(err){
                reject(err)
            }
            if(stderr){
                reject(stderr)
            }
            else resolve(stdout)
        })
    })
}
app.get('/compile/:id',async (req,res)=>{
    try{
        const {id} = req.params
        const path = `/var/lib/capstonedata/${id}/source.c`
        let output = await compile.customSpawn(id)
        res.status(200).send(output)
    }catch(error){
        console.error(error)
        res.status(404).send(error)

    }

})

server.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

