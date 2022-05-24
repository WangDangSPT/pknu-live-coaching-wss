const {writeFileSync} = require('fs')

function appendCode(code,userid){
    const path = `../userdata/${userid}/source.c`
    //Widows test path
    const pathWin = `./test/${userid}/source.c`
    writeFileSync(pathWin,code,err=>{
        if(err){
            console.error(err);
        }
    })
}

module.exports.appendCode = appendCode