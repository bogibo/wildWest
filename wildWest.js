/**
 * Class WildWest contains all data about the current state of the quest and methods for managing it
 */
class WildWest {
  /**
   * Create a new quest
   * @constructor
   * @param {number} amountTasks
   * @param {Array} pinMap see {@link PINMAP}
   * @param {*} io instance of socket.io
   */
  constructor(amountTasks, pinMap, io) {
    /**
     * Shows if the quest is running
     * @type {boolean}
     */
    this.isStart = false
    /**
     * Shows if the quest is completed
     * @type {boolean}
     */
    this.isFinish = false
    /**
     * Array of available tasks.
     * Will be filled with false on initialization
     * @type {boolean[]}
     */
    this.tasks = new Array(amountTasks).fill(false)
    /**
     * Will be filled with 0 on initialization.
     * Helps to count how many tasks have been completed
     * @type {number[]}
     */
    this.taskParts = new Array(amountTasks).fill(0)
    /**
     * Instance of socket.io
     */
    this.io = io
    /**
     * Game start timestamp
     * @type {(Date|null)}
     */
    this.startTime = null
    /**
     * Game finish timestamp
     * @type {(Date|null)}
     */
    this.finishTime = null
    /**
     * Current pinout
     * @type {Array}
     */
    this.pinMap = pinMap
    this.pinHistory = []
  }
  getPinHistory = () => {
    return this.pinHistory
  }
  setPinHistory = (pin, remove = false) => {
    if (remove) {
      this.pinHistory = this.pinHistory.filter((item) => item.pin !== pin)
      return
    }
    this.pinHistory.push(pin)
  }

  /**
   * Shows the current state of the quest
   * @method
   * @returns {boolean}
   */
  getIsStart = () => {
    return this.isStart
  }
  /**
   * Allows you to set the quest status as enabled if that quest is not completed.
   * Also sends an event to the client "game started"
   * @method
   * @param {boolean} newState
   * @returns {void}
   */
  setIsStart = (newState) => {
    if (typeof newState === 'boolean' && !this.isFinish) {
      if (newState === true) this.startTime = Date.now()
      this.isStart = newState
      this.io.emit('res', 'game started')
    }
  }
  /**
   * Returns the start time of the quest
   * @method
   * @returns {(Date|null)}
   */
  getStartTime = () => {
    return this.startTime
  }
  /**
   * Returns the task state if an index is provided;
   * otherwise returns a list of all task statuses
   * @method
   * @param {number} index
   * @returns {(boolean|boolean[])}
   */
  getTasks = (index) => {
    if (typeof index === 'number') {
      return this.tasks[index]
    } else {
      return this.tasks
    }
  }
  /**
   * Force sets the new task status and sends an event to the client "tasksState"
   * @method
   * @param {number} index
   * @param {boolean} newState
   * @returns {void}
   */
  setTasks = (index, newState) => {
    if (typeof index === 'number' && typeof newState === 'boolean') {
      this.tasks[index] = newState
      io.emit('tasksState', this.tasks)
      this.checkIsFinish()
    }
  }
  getFinishTime = () => {
    return this.finishTime
  }

  /**
   * Sets the new task status and sends an event to the client "tasksState"
   * @method
   * @param {number} index
   * @param {boolean} newState
   * @returns {void}
   */
  setTaskState = (index, pin, pinState) => {
    if (this.tasks[index]) return
    if (!pinState) {
      if (this.taskParts[index] !== 0) this.taskParts[index]--
      this.setPinHistory(pin, true)
      this.io.emit('pinHistory', this.pinHistory)
    }
    this.taskParts[index]++
    const currentTaskParts = this.pinMap.filter(
      (item) => (item.taskIndex = index)
    )
    if (currentTaskParts.length >= currentTaskParts.length) {
      this.tasks[index] = true
      this.setPinHistory(pin)
      console.log('tasksState', this.tasks)
      io.emit('tasksState', this.tasks)
      this.checkIsFinish()
      return true
    } else {
      this.io.emit('pinHistory', this.pinHistory)
      return false
    }
  }
  /**
   * Check if all tasks have been solved.
   * If yes, then it sends the event to the client "finish"
   * @method
   * @returns {void}
   */
  checkIsFinish = () => {
    const result = this.tasks.reduce((sum, current) => sum + current, 0)
    if (result === this.tasks.length) {
      this.finishTime = Date.now()
      this.isStart = false
      this.isFinish = true
      this.io.emit('finish', { finishTime: this.finishTime })
    }
  }
  /**
   * Resets the quest state to its original state
   * @method
   * @returns {void}
   */
  reset = () => {
    this.isStart = false
    this.isFinish = false
    this.startTime = null
    this.finishTime = null
    this.tasks.fill(false)
    this.taskParts.fill(0)
    this.pinHistory = []
  }
}

module.exports = {
  WildWest: WildWest,
}
