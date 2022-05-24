const {exec} = require('child_process')
const compile = require('./helpers/c/exec')

//API endpoint to retrieve working directory of currency user
app.get('/getDir/:id',async (req,res)=>{
    const { id } = req.params
    //user data path in linux
    const path = `/var/lib/capstonedata/${id}`
    //windows test path
    //const pathWin = `dir`
    let output = await lsDir()
    res.status(200).send(output) 
})
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
app.get('/testapi',(req,res)=>{
    res.status(200).send('testing endpoint')
})



