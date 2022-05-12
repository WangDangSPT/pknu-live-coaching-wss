const {spawn} = require('child_process')
const {writeFileSync} = require('fs');

//need to wrap this in a promise
let compileString = (sourceCode)=>{
    //convert string to .c file
    let output = ''
    writeFileSync('test/source.c',sourceCode,err =>{
        if(err){
            console.log(`error: ${err}`);
        }
    })
    return compileFile()
    
}

let compileFile = () =>{
    let output = ''
    let child = spawn(`gcc -o test/output.out test/source.c`,{
        shell: true
    })
    child.stderr.on('data', (data=>{
        console.error(`stderr : ${data}`)
    }))
    child.on('exit', (code,signal)=>{
        //singal == null when process exits normally
        if(signal === null){
            let child2 = spawn('test/output.out', {
                // dont use stdio:inherit
                shell: true
                })
                child2.stdout.on('data', (data) =>{
                    // return output+=data;
                    output += data.toString()
                    return output;
                })
                child2.stderr.on('data', (data=>{
                    console.error(`stderr : ${data}`)
                    // return output = `error while executing source file, stderr : ${data}`
                }))
        }
    })

    
}
module.exports.compileFile = compileFile
