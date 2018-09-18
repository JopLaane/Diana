const config = require('../config');
const bot = config.eris;

const help = require('./commandsHelp');

let modCommands = help.commands.catMod;
let gameCommands = help.commands.catGames;
let allCommands = help.commands.catAll;
let diCommands = help.commands.catDIO;

let modHelpUI = "";
let gameHelpUI = "";
let allHelpUI = "";
let diHelpUI = '';

Object.keys(modCommands).forEach((key) => {
    modHelpUI += `**Command:** ${modCommands[key].name}\r\n**Description:** ${modCommands[key].description}\r\n**Usage:** \`${modCommands[key].usage}\`\r\n\r\n`;
});

Object.keys(gameCommands).forEach((key) => {
    gameHelpUI += `**Command:** ${gameCommands[key].name}\r\n**Description:** ${gameCommands[key].description}\r\n**Usage:** \`${gameCommands[key].usage}\`\r\n\r\n`;
});

Object.keys(allCommands).forEach((key) => {
    allHelpUI += `**Command:** ${allCommands[key].name}\r\n**Description:** ${allCommands[key].description}\r\n**Usage:** \`${allCommands[key].usage}\`\r\n\r\n`;
});

Object.keys(diCommands).forEach((key) => {
    diHelpUI += `**Command:** ${diCommands[key].name}\r\n**Description:** ${diCommands[key].description}\r\n**Usage:** \`${diCommands[key].usage}\`\r\n\r\n`;
});

const helpCommand = bot.registerCommand('help', (msg, args) => {

    // get admin roles and stuff
    if(msg.member.hasRole(config.roles.admin)) {
        bot.getDMChannel(msg.author.id).then(c => {
            bot.createEmbed(c.id, {
                description: modHelpUI,
                author: {
                    name: `Mods only!`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099
            });
            bot.createEmbed(c.id, {
                description: gameHelpUI,
                author: {
                    name: `Games 'n stuff`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099,
            });
            bot.createEmbed(c.id, {
                description: allHelpUI,
                author: {
                    name: `Misc stoof`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099
            });
            bot.createEmbed(c.id, {
                description: diHelpUI,
                author: {
                    name: `Di Commands (props to Benoyi##1337)`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099
            });
        });
            //console.log(help.commands.catMod.command2.name);
    } else {
        bot.getDMChannel(msg.author.id).then(c => {
            bot.createEmbed(c.id, {
                description: gameHelpUI,
                author: {
                    name: `Games 'n stuff`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099,
            });
            bot.createEmbed(c.id, {
                description: allHelpUI,
                author: {
                    name: `Misc stoof`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099
            });
            bot.createEmbed(c.id, {
                description: diHelpUI,
                author: {
                    name: `Di Commands (props to Benoyi##1337)`,
                    icon_url: msg.author.avatarURL //make fancy yes
                },
                color: 0xff0099
            });
        });
    }
});
