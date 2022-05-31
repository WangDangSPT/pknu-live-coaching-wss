const {existsSync} = require('fs')
const {mkdirSync} = require('fs')



function checkDir(userID){
    //const pathWin = `./test/${userID}`
    const path = `../userdata/${userID}`
    if(!existsSync(path)){
        mkdirSync(path,{recursive: true})
    }
    return
}

module.exports = checkDir