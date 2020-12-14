const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
io = require('socket.io')(server)
app.use(cors())
app.use(express.static('public'))

const WildWest = require('./wildWest').WildWest
const Rpio = require('./rpio').Rpio

const { TASKAMOUNT, PORT, PINMAP, TASKLIST, QUESTINFO } = require('./config')

app.get('/', (req, res) => {
  res.send(__dirname + 'index')
})

const game = new WildWest(TASKAMOUNT, PINMAP, io)
const control = new Rpio(PINMAP, TASKLIST, game)

io.on('connect', (socket) => {
  socket.on('getInitData', () => {
    socket.emit('questInfo', {
      ...QUESTINFO,
      isStart: game.getIsStart(),
      pinHistory: game.getPinHistory(),
      taskList: TASKLIST,
      taskState: game.getTasks(),
      pinMap: PINMAP,
      startTime: game.getStartTime(),
      finishTime: game.getFinishTime(),
    })
  })
  socket.on('getTaskList', () => {
    socket.emit('taskList', TASKLIST)
  })
  socket.on('getStatus', () => {
    socket.emit('gameStatus', game.getIsStart())
  })
  socket.on('getStartTime', () => {
    socket.emit('gameStartTime', game.getStartTime())
  })
  socket.on('gameToggle', () => {
    if (game.getIsStart()) {
      game.reset()
      socket.emit('questInfo', {
        ...QUESTINFO,
        isStart: game.getIsStart(),
        pinHistory: game.getPinHistory(),
        taskList: TASKLIST,
        taskState: game.getTasks(),
        pinMap: PINMAP,
        startTime: game.getStartTime(),
        finishTime: game.getFinishTime(),
      })
    } else {
      game.setIsStart(true)
      socket.emit('gameStatus', {
        isStart: game.getIsStart(),
        startTime: game.getStartTime(),
      })
    }
  })
  socket.on('gameReset', () => {
    game.reset()
    socket.emit('questInfo', {
      ...QUESTINFO,
      isStart: game.getIsStart(),
      pinHistory: game.getPinHistory(),
      taskList: TASKLIST,
      taskState: game.getTasks(),
      pinMap: PINMAP,
      startTime: game.getStartTime(),
      finishTime: game.getFinishTime(),
    })
  }) 
  socket.on('setTask', (data) => {
    if (game.getIsStart()) {
      const { taskIndex, actionPin, taskState, actionType } = data
      control.setPinState(actionPin, taskState, actionType)
      game.setTasks(taskIndex, taskState)
    }
  })
})

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
