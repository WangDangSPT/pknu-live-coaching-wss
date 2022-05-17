const {writeFileSync} = require('fs')

function appendCode(code,userid){
    const path = `/var/lib/capstonedata/${userid}/source.c`
    writeFileSync(`test/source2.c`,code,err=>{
        if(err){
            console.error(err);
        }
    })
}

module.exports.appendCode = appendCode