const CryptoJS = require("crypto-js")
const NodeRSA = require('node-rsa')
const app = require('express')()
const server = require('http').Server(app)
const password = "password"

let io = require('socket.io')(server)

const port = 3000

server.listen(port)

io.on('connection', (socket) => {
  socket.emit('publicKey')
  socket.on('message', (event) => {
    socket.broadcast.emit('message', event)
  })
  socket.on('publicKey', (event) => {
    let publicKey = new NodeRSA(event)
    let encrypted = publicKey.encrypt(password, 'base64')
    socket.emit("DES", encrypted)
  })
})

io.on('disconnect', (evt) => {
  console.log("A client left")
})
