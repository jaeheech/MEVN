const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 3000

const _path = path.join(__dirname, '/4ex_dist2') //지금경로 , 하위경로 
console.log(_path)

app.use('/', express.static(_path))
app.use(logger('tiny'))
app.get('/data',(req,res)=>{
    const name =req.query.name
    const age =req.query.age
    const gender =req.query.gender
    const board =req.query.board
    const date=req.query.date
   
    res.redirect('/done.html')
})

app.listen(PORT, () => {
    console.log(`너의 서버는? ${PORT}!`)
})

