const config = require('../config');
const bot = config.eris;

const startsWith = require('starts-with');
const Cleverbot = require('cleverbot-node');

let cleverbot = new Cleverbot;
let clever = false;

const lang = require('./languages.js');

let langarr = lang.lang;

cleverbot.configure({botapi: "CCCCwHuhUnKhdOjfhQ2SqTALjfw"});

bot.on("messageCreate", (msg) => {
    if(msg.author.id == bot.user.id) return;
    let cleverMessage;
    let answer;

    if (startsWith(msg.content, "<@!" + bot.user.id + ">")) {
        cleverMessage = msg.content.replace("<@!" + bot.user.id + ">", "");
    } else if(startsWith(msg.content, "<@&" + config.roles.izzy + ">")) {
        cleverMessage = msg.content.replace("<@&" + config.roles.izzy + ">", "");
    } else if (msg.channel.type == 1) {
        if (startsWith(msg.content, bot.user.mention)) {
            cleverMessage = msg.content.replace("<@!" + bot.user.id + ">", "");
        } else {
            cleverMessage = msg.content;
        }
    } else {
        return;
    }

    let sp = `${msg.author.mention} ¿Que? No me gustan los mensajes vacíos`;

    if(cleverMessage == "" || cleverMessage == " ") {
        msg.delete();
        bot.createMessage(msg.channel.id, sp).then(ms => {
            bot.addMessageReaction(msg.channel.id, ms.id, "🔁");
            bot.on("messageReactionAdd", (message, emoji, userID) => {
                if(userID == bot.user.id) return;
                message.edit(`${msg.author.mention} ` + lang[Math.floor((Math.random() * lang.length))]);
            });
            bot.on("messageReactionRemove", (message, emoji, userID) => {
                if(userID == bot.user.id) return;
                message.edit(`${msg.author.mention} ` + lang[Math.floor((Math.random() * lang.length))]);
            });
        });
        return;
    }

    cleverbot.write(cleverMessage, (response) => {
        if(!msg.channel.type == 1){
          answer = "<@" + msg.author.id + "> " + response.output.replace("Cleverbot", bot.user.username);
        }
        else
        {
          answer = response.output.replace("Cleverbot", bot.user.username);
        }
        bot.createMessage(msg.channel.id, answer);
    });
});
