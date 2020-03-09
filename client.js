const CryptoJS = require("crypto-js")
const NodeRSA = require('node-rsa')
const Base64 = require('js-base64').Base64
let socket = require('socket.io-client')('http://localhost:3000')
const chalk = require('chalk')
const repl = require('repl')
const privateKey = new NodeRSA()
privateKey.generateKeyPair(2048, 65537)

let password
let username
console.log(chalk.red('Connecting...'))

socket.on('disconnect', function() {
  socket.emit('disconnect')
})

socket.on('connect', () => {
  console.log(chalk.red('Waiting for PublicKey :'))
})

socket.on('publicKey', () => {
  socket.emit('publicKey', privateKey.exportKey('pkcs8-public-pem'))
})

socket.on('DES', (data) => {
  password = privateKey.decrypt(data, 'utf8')
  console.log(chalk.red('Choose an username :'))
})

socket.on('message', (data) => {
  let decrypted = CryptoJS.DES.decrypt(Base64.decode(data), password).toString(CryptoJS.enc.Utf8)
  console.log(chalk.green(decrypted))
})

repl.start({
  prompt: '',
  eval: (cmd) => {
    if(username == undefined) {
      username = cmd
      console.log(chalk.red('Your username is : ' + username))
      console.log(chalk.red('=== start chatting ==='))
    }else {
      let dataToSend = username.trim() + ' : ' + cmd
      let encrypted = Base64.encode(CryptoJS.DES.encrypt(dataToSend, password))
      socket.emit('message', encrypted)
    }
  }
})
