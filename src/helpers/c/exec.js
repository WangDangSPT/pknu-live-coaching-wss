const {spawn} = require('child_process')
const {writeFile} = require('fs');

//need to wrap this in a promise
let compile = (sourceCode)=>{
    //convert string to .c file
    let output = ''
    writeFile('source.c',sourceCode,err =>{
        if(err){
            console.log(`error: ${err}`);
        }
    })
    //child process to exec output.o iff source.c is compiled
    let child = spawn('gcc -o output.o source.c && ./output.o', {
        stdio: 'inherit',
        shell: true
    })
    child.stdout.on('data', (data) =>{
        return output+=data;
    })
    
}
module.exports.compile