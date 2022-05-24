const {createServer} = require('http')
const Websocket = require('ws')
const {exec} = require('child_process')
const express = require('express')

const compile = require('./helpers/c/exec')
const appendCode = require('./helpers/appendCode')
const checkDir = require('./helpers/directory')

const app = express()
const server = createServer(app)
const wss = new Websocket.Server({server})
const port = 8001

// client id generator


wss.on('connection', (socket,req) =>{
    socket.on('message', data=>{
        const userdata = JSON.parse(data);
        // check if user dir exists, if not make dir
        checkDir(userdata.id)
        appendCode.appendCode(data,userdata.id)
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
app.get('/testapi',(req,res)=>{
    res.status(200).send('testing endpoint')
})

server.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})

