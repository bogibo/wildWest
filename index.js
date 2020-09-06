const express = require("express")
const app = express()
const cors = require("cors")
const server = require("http").createServer(app)
io = require("socket.io")(server)
app.use(cors())
app.use(express.static("public"))

const WildWest = require("./wildWest").WildWest
const Rpio = require("./rpio").Rpio

const { TASKAMOUNT, PORT, PINMAP, TASKLIST } = require("./config")

app.get("/", (req, res) => {
  res.send(__dirname + "index")
})

const game = new WildWest(TASKAMOUNT, PINMAP, io)
const control = new Rpio(PINMAP, game)

io.on("connect", (socket) => {
  socket.on("getTaskList", () => {
    socket.emit("taskList", TASKLIST)
  })
  socket.on("getStatus", () => {
    socket.emit("gameStatus", game.getIsStart())
  })
  socket.on("getStartTime", () => {
    socket.emit("gameStartTime", game.getStartTime())
  })
  socket.on("setStartGame", (data) => {
    game.setIsStart(data)
    socket.emit("gameStatus", game.getIsStart())
    if (data) socket.emit("gameStartTime", game.getStartTime())
  })
  socket.on("setTask", (data) => {
    const { taskIndex, actionPin, taskState, actionType } = data
    control.setPinState(actionPin, taskState, taskIndex, actionType)
  })
})

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
