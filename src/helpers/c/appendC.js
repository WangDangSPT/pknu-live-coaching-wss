const {existsSync,writeFileSync} = require('fs')
//a file handler is assigned for each client, so we use
// writeStream instead of appendFile
function appendCode(code,userid){
    writeFileSync(`/var/lib/capstonedata/${userid}/source.c`,code,{flag: 'a+'},err=>{
        if(err){
            console.error(err);
        }
    })
}

module.exports.appendCode = appendCode