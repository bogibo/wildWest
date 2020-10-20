/**
 * @file Manages the configuration settings for the quest
 * @module Config
 */

/**
 * Number of tasks
 * @const {number}
 */
const TASKAMOUNT = 10
/**
 * Web server port
 * @const {number}
 */
const PORT = 5000
/**
 * Describes a list of tasks. Where "taskName" is the name of the task, "taskIndex" is the index, "actionPin" is the pin number that should work after the task is completed, "actionType" is the type of output signal
 * @const {Array.<{taskName: String, taskIndex: Number, actionPin: Number, actionType: String}>}
 */
const TASKLIST = [
  {
    taskName: "Загадка 1",
    taskIndex: 0,
    actionPin: 15,
    actionType: "switch",
  },
  {
    taskName: "Загадка 2",
    taskIndex: 1,
    actionPin: 15,
    actionType: "switch",
  },
  {
    taskName: "Загадка 3",
    taskIndex: 2,
    actionPin: 15,
    actionType: "switch",
  },
]
/**
 * Current pinout. Describes a list of pins. Where "taskName" is the name of the task, "taskIndex" is the index, "pin" is the gpio port number, "direction" is the port direction (INPUT | OUTPUT)
 * @const {Array.<{taskName: String, taskIndex: Number, pin: Number, direction: String}>}
 */
const PINMAP = [
  // настройка GPIO
  {
    taskName: "task1", // название загадки
    taskIndex: 0,
    pin: 16, // номер порта
    direction: "INPUT",
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 19, // номер порта
    direction: "INPUT",
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 21, // номер порта
    direction: "INPUT",
  },
  {
    taskName: "task1", // название загадки
    taskIndex: 1,
    pin: 23, // номер порта
    direction: "INPUT",
  },
  {
    taskName: "action",
    taskIndex: null,
    pin: 15,
    direction: "OUTPUT",
  },
]

module.exports = {
  TASKAMOUNT,
  PORT,
  PINMAP,
  TASKLIST,
}
