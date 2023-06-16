const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 3000
const _path = path.join(__dirname, './4ex_dist') //지금경로 , 하위경로 

/*POST 해석*/ 
app.use(express.json()) //post 방식으로 할때 필수
app.use(express.urlencoded({extended:true}))


app.use('/', express.static(_path))
app.use(logger('tiny'))
app.post('/info',(req,res)=>{
    const obj = req.body
    console.log(obj)
    console.log(obj.id)
    console.log(obj.pw)

})

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 동작중!`)
})