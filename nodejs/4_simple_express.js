const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()
const PORT = 3000
const _path = path.join(__dirname, './dist')
console.log(_path)
app.use('/dist', express.static(_path))
app.use(logger('tiny'))
//커스텀 미들웨어
app.use((req,res,next)=>{
    console.log('요청이 왔네요~ 지나갑니다~')
    next()
})

app.get('/book/:bookName', (req,res)=>{
    const {bookName} = req.params
    res.send(`안녕하세요 홍철이네 서점입니다. ${bookName}을 주문하셨군요!`)
})
app.listen(PORT,()=>{
    console.log(`너의 서버는? ${PORT}!`)
})