const { Server } = require('socket.io')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const http = require('http')
const app = express()

const server = http.createServer(app)
const io = new Server(server)

const port = 3000
const _path = path.join(__dirname, '/')
app.use('/', express.static(_path))
app.use(logger('tiny'))

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    // 받을 내용
    io.emit('chat message', msg) // 보낼 내용
  })
})

server.listen(port, () => {
  console.log(port + '에서 서버동작 완료')
})
