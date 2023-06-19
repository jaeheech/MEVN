const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 3000

const _path = path.join(__dirname, './4ex_dist') //지금경로 , 하위경로 
console.log(_path)

app.use('/main', express.static(_path))
app.use(logger('tiny'))
app.get('/main/data',(req,res)=>{
    const name =req.query.name
    const age =req.query.age
    const content =req.query.content
    console.log(name,age,content)
    res.redirect('/main/done.html')
})

app.listen(PORT, () => {
    console.log(`너의 서버는? ${PORT}!`)
})
