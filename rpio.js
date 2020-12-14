const rpio = require('rpio')

/**
 * Class Rpio allows you to configure and manage the gpio.
 */

class Rpio {
  /**
   * Create a new Rpio
   * @param {Object[]} pinMap current pinout
   * @param {Object[]} taskList current task list
   * @param {*} game current game instance
   */
  constructor(pinMap, taskList, game) {
    this.pinMap = pinMap
    this.taskList = taskList
    this.game = game
    /**
     * Sets the state of tasks in the game in accordance with the current state of the inputs
     * @param {number} pin
     * @returns {void}
     */
    const taskHandler = (pin) => {
      console.log(`pin ${pin} is `, rpio.read(pin))
      if (this.game.getIsStart()) {
        const taskItem = this.pinMap.find((item) => item.pin === parseInt(pin))
        if (!taskItem) return
        /**
         * TODO
         * check current state of pin
         * call setTaskState for specific state
         */
        const result = this.game.setTaskState(taskItem.taskIndex, pin, rpio.read(pin))
        if (result) {
          const currentTaskIndex = this.pinMap.filter(
            (item) => item.pin === pin
          )
          if (!currentTaskIndex || currentTaskIndex.length === 0) return
          const currentTask = this.taskList.filter(
            (item) => item.taskIndex === currentTaskIndex[0].taskIndex
          )
          if (!currentTask || currentTask.length === 0) return
          this.setPinState(currentTask[0].actionPin, true, currentTask[0].actionType)
        }
      }
    }

    pinMap.map((item) => {
      if (item.direction === 'INPUT') {
        rpio.open(item.pin, rpio.INPUT, rpio.PULL_DOWN)
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
   * @param {string} actionType
   * @returns {void}
   */
  setPinState = (pin, newState, actionType) => {
    if (typeof pin === 'number' && typeof newState === 'boolean') {
      switch (actionType) {
        case 'switch':
          rpio.write(pin, rpio.LOW)
          rpio.msleep(500)
          rpio.write(pin, rpio.HIGH)
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
