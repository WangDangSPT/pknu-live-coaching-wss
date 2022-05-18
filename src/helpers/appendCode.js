const {writeFileSync} = require('fs')

function appendCode(code,userid){
    const path = `/var/lib/capstonedata/${userid}/source.c`
    //Widows test path
    //const pathWin = `./test/source2.c`
    writeFileSync(path,code,err=>{
        if(err){
            console.error(err);
        }
    })
}

module.exports.appendCode = appendCode