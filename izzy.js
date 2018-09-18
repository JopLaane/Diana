/**
 * Bot functionalities:
    - ?
 */

const config = require('./config');
const bot = config.eris;
const log = require('./src/logger.js');

bot.on('connect', () => {
    log.success(`Succesfully connected!`);
});

bot.on('ready', () => {
    log.info("Izzy (Dev) is ready!");
    bot.editStatus(`online`, {name: `The Making of Toast!`, type: 1, url: `https://www.twitch.tv/Toastysoul`});

    require('./src/eventsToDmToBenji');
    require('./src/commands');
    require('./src/help');
    require('./src/search');
    require('./src/list');
    require('./src/colors');
    require('./src/r6stats');
});

const spamFilter = require('./src/spamfilter');
const clevahGrill = require('./src/cleverbitch');
const toast = require('./src/toast');

bot.on("messageCreate", (msg) => {
    toast.toasty(msg, bot);
    toast.dunes(msg, bot);
    spamFilter.emoteSpamCheck(msg, bot);
    spamFilter.spamCheck(msg, bot);
});

bot.on('error', (err, id) => {
    log.error(`${err}`);
});

let subStuff = require('./src/sub-create-unsub');
bot.on('guildRoleDelete', (guild, role) => {
    subStuff.deleteRoleOnDeletion(guild, role);
});

bot.connet();
