const compile = require('../src/helpers/c/exec')
const {spawnSync} = require('child_process')

//compile.compileFile()

const lsDir = ()=>{
    let result = ''
    let child1 = spawnSync('ls',{
        shell: true
    })
    child1.stderr.on('data',data=>{
        console.log(data);
        result = data
    })
    child1.stdout.on('data',data=>{
        console.log(data);
        result += data
    })
    console.log(result)
    
    
}
lsDir()