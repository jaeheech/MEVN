const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value'
})

io.on('connection', (socket) => {
  socket.broadcast.emit('hi')
})

io.on('connection', (socket) => {
  io.emit('chat message', 'A user has joined the chat.')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    socket.on('disconnect', () => {
      io.emit('chat message', 'A user has left the chat.') // Emit leave message to everyone
    })
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
