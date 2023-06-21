const express= require('express')
const path= require('path')
const logger= require('morgan')
const fs = require('fs')
const app = express()
const _path = path.join(__dirname,'/')
app.use('/',express.static(_path))
app.use(logger('tiny'))

//동작 테스트
const file ='test1'
const data ='와 테스트파일이 작성되었다.!~~~'
fs.writeFile(_path+'/'+file + '.txt',data,(e)=>{
    if(e)console.log(e)
    console.log('파일 작성이 완료 되었습니다.')
})


app.listen(3000,()=>{console.log('listening on port 3000')})