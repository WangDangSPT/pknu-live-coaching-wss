const {spawn} = require('child_process')
const {writeFile} = require('fs');
let compile = (sourceCode)=>{
    //convert string to .c file
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
}
module.exports.compile