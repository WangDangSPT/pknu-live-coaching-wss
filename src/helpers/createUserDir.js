const {mkdir,mkdirSync} = require('fs')
const util = require('util')
const mkdirPromise = util.promisify(mkdir)

async function createDir(userid){
    //recursive flag creates dir regardless of whether path exist
    const path = `/var/lib/capstonedata/${userid}`
    // windows test path
    //const pathWin = `./test/${userid}`
    await mkdirPromise(path,{recursive : true})
    console.log(`dir created : ${userid} `);
}
function createDirSync(userid){
    // Windows test path
    const pathWin = `./test/${userid}`
    mkdirSync(pathWin,{recursive: true})
}

module.exports.createDir = createDir
module.exports.createDirSync = createDirSync