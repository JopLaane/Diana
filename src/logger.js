const config = require('../config');
const bot = config.eris;
const funcs = require('./globalFunctions');
const chalk = require('chalk');

const functions = {
    log: (string) => {
        console.log(chalk.white(`${funcs.getTime()} ${string}`));
    },
    success: (string) => {
        console.log(chalk.green(`${funcs.getTime()} ${string}`));
    },
    error: (string) => {
        console.log(chalk.red(`${funcs.getTime()} ${string}`));
    },
    info: (string) => {
        console.log(chalk.yellow(`${funcs.getTime()} ${string}`));
    }
}

module.exports = functions;
