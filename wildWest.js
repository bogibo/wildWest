class WildWest {
  constructor(amountTasks, pinMap, io) {
    this.isStart = false
    this.tasks = new Array(amountTasks).fill(false)
    this.taskParts = new Array(amountTasks).fill(0)
    this.io = io
    this.startTime = null,
    this.pinMap = pinMap
  }

  getIsStart = () => {
    return this.isStart
  }
  setIsStart = (newState) => {
    if (typeof newState === "boolean") {
      if (newState === true) this.startTime = Date.now()
      this.isStart = newState
      this.io.emit("res", "game started")
    }
  }

  getStartTime = () => {
    return this.startTime
  }

  getTasks = (index) => {
    if (typeof index === "number") {
      return this.tasks[index]
    } else {
      return this.tasks
    }
  }
  setTasks = (index, newState) => {
    if (typeof index === "number" && typeof newState === "boolean") {
      this.tasks[index] = newState
      io.emit("tasksState", this.tasks)
    }
  }
  setTaskState = (index, newState) => {
    if (this.tasks[index]) return
    if (newState) {
      this.taskParts[index]++
    } else {
      this.taskParts[index]--
    }
    const currentTaskParts = this.pinMap.map(item => {
      if (item.taskIndex = index) return item
    })
    if (currentTaskParts.length === this.taskParts[index]) {
      this.tasks[index] = true
      io.emit("tasksState", this.tasks)
    }
  }
  
  checkIsFinish = () => {
    const result = this.tasks.reduce((sum, current) => sum + current, 0)
    return result === this.tasks.length ? true : false
  }
  reset = () => {
    this.isStart = false
    this.tasks.fill(false)
    this.taskParts.fill(0)
  }
}

module.exports = {
  WildWest: WildWest,
}
