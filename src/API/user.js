const {exec} = require('child_process')

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




