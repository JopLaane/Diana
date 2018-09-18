const startsWith = require('starts-with');
const config = require('../config');
const log = require('./logger.js');

const spamFilter = {

    emoteSpamCheck: (msg, bot) => {
        let emoteArr = (msg.content.match(/<a{0,1}:[a-zA-Z0-9]+:[0-9]+>/g));
        if (emoteArr) {
            let sorted_arr = emoteArr.slice().sort();
            let bool;
            for (let i = 0; i < emoteArr.length; i++) {
                if (sorted_arr[i + 20] == sorted_arr[i]) {
                    bool = true;
                }
            }
            if (bool == true) {
                bot.createMessage(msg.channel.id, `${msg.author.mention}, don't spam emotes. Mind other users that might find this annoying.`)
                msg.delete();
                return true;
            }
        }
        return false;
    },

    spamCheck: (msg, bot) => {

        if(msg.content == "" || msg.content == " " || msg.author.id == bot.user.id || startsWith(msg.content, bot.user.mention) || startsWith(msg.content, "<@&" + config.roles.izzy + ">")) {
            return;
        } else {

            let messageCollection = msg.channel.messages;

            let messageArr = messageCollection.filter((m) => m.content.toLowerCase() == msg.content.toLowerCase() && m.author == msg.author);

            messageArr = messageArr.reverse();

            if (typeof messageArr[1] === 'undefined') {
                log.info("No second message. No filtering required");
            } else {
                let firstMessage = messageArr[1];
                let firstMessageTime = firstMessage.timestamp;

                let secondMessage = messageArr[0];
                let secondMessageTime = secondMessage.timestamp;

                let timeDiff = Math.abs(secondMessageTime - firstMessageTime);

                if (messageArr.length > 1 && timeDiff < 5000) {
                    msg.delete();
                    let spamArr = messageCollection.filter((m) => m.author == msg.author && m.timestamp >= msg.timestamp - 5000); //gets messages of the author sent during the last 10 seconds
                    return true;
                }
            }
            return false;
            //writeToLog(`${displayCurrentTime()} ${msg.author.username}: "${msg.content}" on ${displayDay()}\r\n`);
        }
    }
}

module.exports = spamFilter;
