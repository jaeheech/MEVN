const express=require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs')
const app=express()
const PORT =3000
const _path=path.join(__dirname,'/')

console.log(_path)
app.use('/',express.static(_path))
app.use(logger('tiny'))

app.get('/files',(req,res)=>{
    fs.readdir(_path,'utf-8',(err,data,)=>{
        // console.log(Array.isArray(data))
        let list = '<ul>'
        data.forEach(v=>{
            if(v.indexOf('.')===-1){
                list += `<li><a href="/#">[${v}]</a></li>`
            }else{
                list += `<li><a href="/${v}" >${v}</a></li>`
            }
        }) 
        list += '</ul>'
        res.send(list);
    })
})

app.listen(PORT,()=>{console.log('listening on port'+PORT)})