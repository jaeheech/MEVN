const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index1.html')
})

io.on('connection', (socket) => {
  console.log('새로운 사용자가 연결되었습니다.')

  socket.on('newMessage', (message) => {
    // 메시지를 보낸 클라이언트에게만 전송하도록 수정
    socket.emit('newMessage', { message, position: 'right' })

    // 나를 제외한 모든 클라이언트에게 메시지 전송
    socket.broadcast.emit('newMessage', { message, position: 'left' })
  })

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다.')
  })
})
server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.')
})
