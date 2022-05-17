const {existsSync} = reuqire('fs')
const server = require('../app')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

server.app.get('/getDir/:id',(req,res)=>{
    const { id } = req.params
    const lsDir = async(id)=>{
        try{
            const {stdout,stderr} = await exec(`ls /var/lib/capstonedata/${id}`)
            if(stderr !== null){
                res.status(200).send(stdout)
            }
            else {
                res.status().send(stderr)
            }
        }
        catch(error){
            console.error(error);
        }

    }
})




