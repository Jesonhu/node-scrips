const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix.
 * 前缀
 */
const PREFIX = 'Node-bins';

const prefix = PREFIX;
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 * 控制台输出信息.
 * @param {String} message
 */

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 * 错误处理.
 * @param {String} message
 */

exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console.
 * 成功处理.
 * @param {String} message
 */

exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/** 
 * task complete `message` to console.
 */
exports.complete = function(...args) {
  const msg = format.apply(format, args)
  console.log(chalk.bgBlue(prefix), sep, msg, chalk.bgGreen(' complete '))
}