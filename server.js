import express from "express"
import http from "http"
import createGame from "./public/game.js"
import {Server} from "socket.io"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId:'player1',playerX:0,playerY:0})
game.addPlayer({playerId:'player2',playerX:9,playerY:9})
game.addFruit({fruitId:'fruit1',fruitX:5,fruitY:8})
game.addFruit({fruitId:'fruit2',fruitX:6,fruitY:5})

sockets.on('connection',(socket) => {
    const playerId = socket.id
    console.log(`Player conectado ao server com o id: ${playerId}`)
})

server.listen(3000,() => {
    console.log("Iniciado na porta 3000")
})