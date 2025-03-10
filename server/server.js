const path = require("path")

const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = 3333

app.use(express.static(path.join(__dirname, "../client")))

io.on("connection", (socket) => {
    const userIP = socket.handshake.address.replace(/^::ffff:/, "")

    socket.broadcast.emit("usr-connect", userIP)

    socket.on("msg", (msg) => {
        socket.broadcast.emit("msg-recieve", {ip: userIP, msg: msg})
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("usr-disconnect", userIP)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})