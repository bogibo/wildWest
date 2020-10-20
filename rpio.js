const rpio = require("rpio")

/**
 * Class Rpio allows you to configure and manage the gpio.
 */

class Rpio {
  /**
   * Create a new Rpio
   * @param {Object[]} pinMap current pinout
   * @param {*} game current game instance
   */
  constructor(pinMap, game) {
    this.pinMap = pinMap
    this.game = game
    /**
     * Sets the state of tasks in the game in accordance with the current state of the inputs
     * @param {number} pin 
     * @returns {void}
     */
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
  /**
   * Allows to control outputs
   * @method
   * @param {number} pin 
   * @param {boolean} newState 
   * @param {number} taskIndex 
   * @param {string} actionType 
   * @returns {void}
   */
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
