const fs = require('fs');
const config = require('../config');
const bot = config.eris;
const roles = config.roles;
const math = require('mathjs');
const funcs = require('./globalFunctions');
const log = require('./logger');


const pingCommand = bot.registerCommand("ping", (msg, args) => {
    let start = Date.now();
    return msg.channel.createMessage('Latency: ').then(ms => {
        let diff = (Date.now() - start);
        return ms.edit(`:ping_pong: Pong biches! | Latency: \`${diff}ms\``);
    });
}, {
    requirements: {
        roleIDs: [roles.admin],
    }
});

const choiceCommmand = bot.registerCommand("choice", (msg, args) => {
    let options = args[0].split(';');
    let randomNumber = Math.floor((Math.random() * options.length));

    let chosenOption = options[randomNumber];

    bot.createMessage(msg.channel.id, `I say: \`${chosenOption}\`, you prolly don't like it, but hey, you asked me to choose xD`);
});

const mathCommand = bot.registerCommand("math", (msg, args) => {
    try {
        let mathPorblem = args.join(' ');
        let res = math.eval(`${mathPorblem}`);
        bot.createMessage(msg.channel.id, `\`\`\`${mathPorblem} = ${res}\`\`\``);
    } catch(e) {
        bot.createMessage(msg.channel.id, `Can't solve this math problem.`);
    }
});

const remindmeCommand = bot.registerCommand("remindme", (msg, args) => {
    let date = args[0];
    let reason = args.slice(1, 500).join().replace(/,/g, " ");

    let splitDate = date.split(':');

    bot.createMessage(msg.channel.id, `${msg.author.mention} you will be reminded about \`${reason}\` in \`${splitDate[0]}\` days, \`${splitDate[1]}\` hours and \`${splitDate[2]}\` minutes!`);

    let days = splitDate[0] * 86400000;
    let hours = splitDate[1] * 3600000;
    let minutes = splitDate[2] * 60000;

    let timeToWait = days + hours + minutes;

    setTimeout(() => {
        msg.author.getDMChannel().then((channel) => {
            channel.createMessage(`Reminder: ${reason}`);
        });
    }, timeToWait);

    console.log(`Remind me in ${timeToWait} miliseconds`);
});

let purgeCommand = bot.registerCommand("purge", (msg, args) => {
    let limit = args[0];

    if (isNaN(limit)) {
        return;
    } else if(!limit) {
        console.log(`Give a message limit as argument plox ;D`);
        return;
    }

    bot.purgeChannel(msg.channel.id, limit);

    console.log(`${limit} messages purged in ${msg.channel.name}`);
}, {
    requirements: {
        roleIDs: [roles.admin],
    }
});

let randomHexColor = require('random-hex-color');
const verifyCommand = bot.registerCommand('verify', (msg, args) => {

    let newUserID = args[0].replace(/^\D+|\D+$/g, "", '');
    let roleName = args[1];

    let guildID = msg.channel.guild.id;

    let motmPos = msg.channel.guild.roles.find((m) => m.id == roles.motm).position;

    let colorHex = randomHexColor();
    let color = colorHex.replace(/#/g, "0x").replace(/"/g, "");

    bot.createRole(guildID, {name: `${roleName}❤`, permissions: 1681251392, color: parseInt(color), mentionable: true}).then(role => {
        bot.addGuildMemberRole(guildID, newUserID, role.id).then(r => {
            bot.editRolePosition(guildID, role.id, motmPos);
        });
        bot.addGuildMemberRole(guildID, newUserID, roles.people);
    }).then(role => {
        bot.createMessage(/*config.channels.main*/ msg.channel.id, `Welcome ${args[0]} to the ***Deathless Infinitive!*** Try \`/help\` to see a list of the available commands.\r\nAlso make sure to ask about the self assignable roles =3`);
    });

}, {
    requirements: {
        roleIDs: [roles.admin],
    }
});

let danceCommand = bot.registerCommand('dance', (msg, args) => {
    bot.createMessage(msg.channel.id, `)~`).then(ms => {
        setTimeout(() => {
            ms.edit("-^)~");
              setTimeout(() => {
                ms.edit("(~^-^)~");
                  setTimeout(() => {
                    ms.edit("~(^-^)~");
                      setTimeout(() => {
                        ms.edit("~(^-^~)");
                          setTimeout(() => {
                            ms.edit("~(^-^)~");
                              setTimeout(() => {
                                ms.edit("(~^-^)~");
                                  setTimeout(() =>{
                                    ms.edit("~(^-^~)");
                                      setTimeout(() => {
                                        ms.edit("^-^~)");
                                          setTimeout(() => {
                                            ms.edit("^~)");
                                              setTimeout(() => {
                                                ms.delete();
          }, 800)}, 800)}, 800)}, 800)}, 800)}, 800)}, 800)}, 800)}, 800)}, 1000);
    });
});

let celciusToFarhrhrhrenheitCommand = bot.registerCommand('ctof', (msg, args) => {
    let c = args[0];

    if(isNaN(c)) {
        bot.createMessage(msg.channel.id, `${c} is not a valid temperature.`)
        return;
    }

    let f = Math.round((math.eval(c * 9/5 + 32) * 100) / 100);

    bot.createMessage(msg.channel.id, `${msg.author.mention} ${c}°C is: ${f}°F`);
}, {
    aliases: ['c2f'],
    deleteCommand: true,
});

let farhrhrhrenheitToCelciusCommand = bot.registerCommand('ftoc', (msg, args) => {
    let f = args[0];

    if(isNaN(f)) {
        bot.createMessage(msg.channel.id, `${f} is not a valid temperature.`)
        return;
    }

    let c = Math.round((math.eval((f - 32) / 1.8) * 100) / 100); //C = (F - 32) / 1.8

    bot.createMessage(msg.channel.id, `${msg.author.mention} ${f}°F is: ${c}°C`);
}, {
    aliases: ['f2c'],
    deleteCommand: true,
});


/*
    ---------------------------
    DI COMMANDS
    ---------------------------
*/


const getAvatarCommand = bot.registerCommand('avatar', (msg, args) => {
    let userID = args[0].replace(/^\D+|\D+$/g, "");
    let user = msg.channel.guild.members.find((u) => u.id == userID);
    return msg.channel.createMessage(user.avatarURL);
}, {
    requirements: {
        roleIDs: [roles.admin],
    }
}); // make profile command

const profileCommand = bot.registerCommand('profile', (msg, args) => {

    let user;
    let member;

    if(args[0]) {
        let userID = args[0].replace(/^\D+|\D+$/g, "");
        let guildUser = msg.channel.guild.members.find((u) => u.id == userID);

        log.info(guildUser.username);
    } else {
        log.log(`bish`);
    }
});

const actualSayCommand = bot.registerCommand('say', (msg, args) => {

    let channel;
    let result;
    if(args[0].match(/<#[0-9]+>/)) {
        channel = args[0].replace(/^\D+|\D+$/g, "");
        result = msg.content.split(' ').slice(2).join(' ');
    } else {
        channel = msg.channel.id;
        result = msg.content.substr(msg.content.indexOf(" ") + 1);
    }

    bot.createMessage(channel, `${result}`);
}, {
    requirements: {
        roleIDs: [roles.admin],
    }
});

const embedCommand = bot.registerCommand('embed', (msg, args) => {
    let channel;
    let result;
    if(args[0].match(/<#[0-9]+>/)) {
        channel = args[0].replace(/^\D+|\D+$/g, "");
        result = msg.content.split(' ').slice(2).join(' ');
    } else {
        channel = msg.channel.id;
        result = msg.content.substr(msg.content.indexOf(" ") + 1);
    }

    bot.createEmbed(channel, {description: `${result}`, color: 0xfe16});
}, {
    requirements: {
        roleIDs: [roles.admin],
    }
});

const lifeCommand = bot.registerCommand('life', (msg, args) => {
    checkTimeWhenJoinedOrCreated(msg, args, "created");
});

const joinedCommand = bot.registerCommand('joined', (msg, args) => {
    checkTimeWhenJoinedOrCreated(msg, args, "joined");
});

const checkTimeWhenJoinedOrCreated = (msg, args, whatToCheck) => {
    let timeJoined ='';
    let check = '';
    let str = '';

    if(!args[0]) {

        if(whatToCheck == "created") {
            check = msg.member.createdAt;
            str = `you joined Discord`;
        } else if(whatToCheck == 'joined') {
            check = msg.member.joinedAt;
            str = `you joined the DIO`;
        }

        timeJoined = funcs.getDayFromUnixTimeStamp(check);
        msg.channel.createMessage(`${msg.author.mention}, ${str} ${timeJoined}.`);

    } else {
        let userID = args[0].replace(/^\D+|\D+$/g, "");
        let guildUser = msg.channel.guild.members.find((u) => u.id == userID);

        if(whatToCheck == "created") {
            check = guildUser.createdAt;
            str = `joined Discord`;
        } else if(whatToCheck == 'joined') {
            check = guildUser.joinedAt;
            str = `joined the DIO`;
        }

        timeJoined = funcs.getDayFromUnixTimeStamp(check);

        let name = '';
        if(guildUser.nick) {
            name = guildUser.nick;
        } else {
            name = guildUser.username;
        }
        msg.channel.createMessage(`${msg.author.mention}, \`${name}\` ${str} ${timeJoined}.`);
    }
}
