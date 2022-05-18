const {spawn} = require('child_process')
// test function
// async function compileFile(){
//     try{
//         //windows test command
//         //const command = 'cd test/ && gcc -o output.out source.c && output.out'
//         let output = await customSpawn(command)
//         console.log(output)
//     }catch(error){
//         console.error(error);
//     }
// }
function customSpawn(userid){
    return new Promise((resolve,reject)=>{
        const arg = `cd /var/lib/capstonedata/${userid} && gcc -o output.out source.c && output.out`
        let child = spawn(`${arg}`,{
            shell:true
        })
        child.stderr.on('data',data=>{
            reject(data.toString())
        })
        child.stdout.on('data',data=>{
            resolve(data.toString())
        })
    })
}
//module.exports.compileFile = compileFile
module.exports.customSpawn = customSpawn
