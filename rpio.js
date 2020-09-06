const rpio = require("rpio")

class Rpio {
  constructor(pinMap, game) {
    this.pinMap = pinMap
    this.game = game

    const taskHandler = (pin) => {
      console.log(`pin ${pin} is `, rpio.read(pin))
      if (this.game.getIsStart()) {
        const taskItem = this.pinMap.find((item) => item.pin === pin)
        if (!taskItem) return
        this.game.setTaskState(taskItem.taskIndex, rpio.read(pin))
      }
    }

    pinMap.map((item) => {
      if (item.direction === "INPUT") {
        rpio.open(item.pin, rpio.INPUT, rpio.PULL_UP)
        rpio.poll(item.pin, taskHandler)
      } else {
        rpio.open(item.pin, rpio.OUTPUT, rpio.HIGH)
      }
    })
  }

  setPinState = (pin, newState, taskIndex, actionType) => {
    if (
      typeof pin === "number" &&
      typeof newState === "boolean" &&
      typeof taskIndex === "number"
    ) {
      switch (actionType) {
        case "switch":
          if (!this.game.getTasks[taskIndex]) {
            rpio.write(pin, rpio.HIGH)
            rpio.msleep(500)
            rpio.write(pin, rpio.LOW)
          }
          this.game.setTasks(taskIndex, newState)
          break
        default:
          break
      }
    }
  }
}

module.exports = {
  Rpio: Rpio,
}
