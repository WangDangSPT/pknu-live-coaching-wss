const {mkdir} = require('fs')

function createDir(socketid){
    mkdir(`/var/lib/capstonedata/${socketid}`,{recursive : true}, (err)=>{
        if(err)throw err
    })
}

module.exports.createDir = createDir