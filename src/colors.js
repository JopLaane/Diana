const config = require('../config');
const bot = config.eris;
const log = require('./logger');

const baseConvert = require('baseconvert');

const getColorCommand = bot.registerCommand('getcolor', (msg, args) => {
    if(msg.channel.id != config.channels.roleconfig) return msg.channel.createMessage(`Wrong channel, ${msg.author.mention}. Please go to: <#386476408840388618>. Thank you!`);
    if(!args[0]) {
        return msg.channel.createMessage(`${msg.author.mention} Y u no gib me role ey? Let's do that again!`);
    } else {
        let allRoles = msg.channel.guild.roles;
        let role = args.toString().replace(/,/g, ' ').toLowerCase();
        let fRole = allRoles.find((r) => r.name == role);

        if(!fRole) {
            return msg.channel.createMessage(`Couldn't find role, ${msg.author.mention}. Try again please =3`);
        }

        let color = baseConvert.dec2hex(fRole.color);
        return msg.channel.createMessage(`Role color: https://www.colorhexa.com/${color}`);
    }
});

const setColorCommand = bot.registerCommand('setcolor', (msg, args) => {
    if(msg.channel.id != config.channels.roleconfig) return msg.channel.createMessage(`Wrong channel, ${msg.author.mention}. Please go to: <#386476408840388618>. Thank you!`);
    if(!args[0]) return msg.channel.createMessage(`${msg.author.mention}, please give me a hex code to work with ;-;`);
    let rawHex = args[0].replace(/#/g, "");
    let newColor = parseInt(`${0}x${rawHex}`);

    if(newColor == 0x000000 || newColor == 0x000) {
        return msg.channel.createMessage(`Eh, discord doesn't handle black well.. Yeah...`);
    }

    for(let i = 0; i < msg.member.roles.length; i++) {
        let role = msg.channel.guild.roles.find((r) => r.id == msg.member.roles[i]);

        if(role.name.substring(role.name.length - 1) == "❤") {
            if(role.name.toLowerCase() != "people❤") {
                bot.editRole(config.guildID, role.id, {
                    color: newColor,
                });
                log.info(`${msg.member.username} changed their role color to: #${rawHex}.`);
                return msg.channel.createMessage(`${msg.author.mention}, you're color has been changed to: #${rawHex} (https://www.colorhexa.com/${rawHex})`);
            }
        }
    }
});
