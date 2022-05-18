const compile = require('../src/helpers/c/exec')
const {existsSync} = require('fs')


compile.compileFile()
if(!existsSync('src/helpers/createUserDir.js')){
    console.log('doesnt exists');
}
else{
    console.log('exists');
}