const TASKAMOUNT = 10 // количество загадок
const PORT = 3000
const TASKLIST = [
  {
    taskName: "Загадка 1",
    taskIndex: 0,
    actionPin: 15,
    actionType: "switch"
  }
]
const PINMAP = [ // настройка GPIO
  {
    taskName: "task1", // название загадки
    taskIndex: 0,
    pin: 16, // номер порта
    direction: "INPUT"
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 19, // номер порта
    direction: "INPUT"
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 21, // номер порта
    direction: "INPUT"
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 23, // номер порта
    direction: "INPUT"
  },
  {
    taskName: "action",
    taskIndex: null,
    pin: 15,
    direction: "OUTPUT"
  },
]

module.exports = {
  TASKAMOUNT,
  PORT,
  PINMAP,
  TASKLIST
}