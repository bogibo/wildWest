/**
 * @file Manages the configuration settings for the quest
 * @module Config
 */

/**
 * Number of tasks
 * @const {number}
 */
const TASKAMOUNT = 6
/**
 * Main info abount the quest
 * @const {{title: String, debug: Boolean}}
 */
const QUESTINFO = {
  title: "Дикий запад",
  debug: true,
}
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
  {
    taskName: "Загадка 4",
    taskIndex: 3,
    actionPin: 15,
    actionType: "switch",
  },
  {
    taskName: "Загадка 5",
    taskIndex: 4,
    actionPin: 15,
    actionType: "switch",
  },
  {
    taskName: "Загадка 6",
    taskIndex: 5,
    actionPin: 15,
    actionType: "switch",
  },
]
/**
 * Current pinout. Describes a list of pins. Where "title" is the name of the subtask, "taskIndex" is the index, "pin" is the gpio port number, "direction" is the port direction (INPUT | OUTPUT)
 * @const {Array.<{title: String, taskIndex: Number, pin: Number, direction: String}>}
 */
const PINMAP = [
  {
    title: "Часть задания 1",
    taskIndex: 0,
    pin: 40,
    direction: "INPUT",
  },
  {
    title: "Часть 1 задания 2",
    taskIndex: 1,
    pin: 19,
    direction: "INPUT",
  },
  {
    title: "Часть 2 задания 2",
    taskIndex: 1,
    pin: 21,
    direction: "INPUT",
  },
  {
    title: "Часть 3 задания 2",
    taskIndex: 1,
    pin: 35,
    direction: "INPUT",
  },
  {
    title: "Часть 4 задания 2",
    taskIndex: 1,
    pin: 31,
    direction: "INPUT",
  },
  {
    title: "Часть 5 задания 2",
    taskIndex: 1,
    pin: 32,
    direction: "INPUT",
  },
  {
    title: "Часть 6 задания 2",
    taskIndex: 1,
    pin: 33,
    direction: "INPUT",
  },
  {
    title: "Часть 7 задания 2",
    taskIndex: 1,
    pin: 36,
    direction: "INPUT",
  },
  {
    title: "Часть 8 задания 2",
    taskIndex: 1,
    pin: 37,
    direction: "INPUT",
  },
  {
    title: "Часть задания 3",
    taskIndex: 2,
    pin: 24,
    direction: "INPUT",
  },
  {
    title: "Часть задания 4",
    taskIndex: 3,
    pin: 29,
    direction: "INPUT",
  },
  {
    title: "Часть задания 5",
    taskIndex: 4,
    pin: 26,
    direction: "INPUT",
  },
  {
    title: "Часть 1 задания 6",
    taskIndex: 5,
    pin: 27,
    direction: "INPUT",
  },
  {
    title: "Часть 2 задания 6",
    taskIndex: 5,
    pin: 28,
    direction: "INPUT",
  },
  {
    title: "action",
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
  QUESTINFO,
}
