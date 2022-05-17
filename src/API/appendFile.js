const {writeFileSync,existsSync} = require('fs')

function appendCode(userid,content){
    let path = `/var/lib/capstonedata/${userid}`
    if(existsSync(path)){
        writeFileSync(path,content,{flag: 'a+'}, err=>{
            if(err) throw err
        })
        return 0    
    }
    console.log(`${path} does not exist`);
    
}

