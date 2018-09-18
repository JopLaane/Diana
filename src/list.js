const config = require('../config');
const bot = config.eris;
const log = require('./logger');

let subbableRoles = require('../db/subbableRoles');

const jsondb = require('node-json-db');

let subbableRolesDB = new jsondb("db/subbableRoles-db", true, true);

const listCommand = bot.registerCommand('list', (msg, args) => {
    let allRoles = msg.channel.guild.roles;

    let allMembers = msg.channel.guild.members;
    let memberArr = Array.from(allMembers);

    let role;
    let fRole;
    let subs = [];
    let embedString = '';
    let membersWithRole;

    if(args[0]) {
        role = args.toString().replace(/,/g, ' ').toLowerCase();
        fRole = allRoles.find((r) => r.name == role);
        if(fRole) {
            membersWithRole = allMembers.filter((m) => m.roles.includes(fRole.id));
            for(let i = 0; i < membersWithRole.length; i++) {
                subs.push(memberArr[i].username);
                embedString += ` - ${membersWithRole[i].username}\r\n`;
            }
            bot.createEmbed(msg.channel.id, {
                description: `${embedString}`,
                author: {
                    name: `These users are subbed to: ${role}`,
                    icon_url: bot.user.avatarURL
                },
                color: 0x0061ff,
                footer: { // Footer text
                    text: `${role} has ${subs.length} subs :D`
                }
            });
            //msg.channel.createMessage(embedString);
        } else {
            log.error(`Couldn't find ${role} as a role..`);
            msg.channel.createMessage(`Couldn't find ${role} in role list :(`);
            return;
        }
    } else {
        let obj = subbableRolesDB.getData('/');
        //let str = '';
        let rolePerMessageCount = [];
        //log.log(JSON.stringify(subbableRolesDB.getData('/')));
        for (key in obj) {
            role = msg.channel.guild.roles.find((m) => m.id == obj[key]);
            //rolePerMessageCount.push(role);
            embedString += `\r\n**__${role.name}:__** `;
            membersWithRole = allMembers.filter((m) => m.roles.includes(role.id));
            if(membersWithRole.length == 0) {
                embedString += `No-one subbed broski :P`;
            }
            for(let i = 0; i < membersWithRole.length; i++) {
                if(membersWithRole[i].nick) {
                    embedString += `${membersWithRole[i].nick}, `;
                } else {
                    embedString += `${membersWithRole[i].username}, `;
                }
            }
        }

        let messages = [];
        let messageCounter = 0;
        while (embedString.length > 1800) {
            let  splitPoint = embedString.indexOf('**__', 1800);
            if (splitPoint > 0) {
                messages[messageCounter] = embedString.substring(0, splitPoint);
                embedString = embedString.substring(splitPoint);
                messageCounter++;
            }
        }
        messages[messageCounter] = embedString;

        for(let j = 0; j <= messages.length - 1; j++) {
            bot.getDMChannel(msg.author.id).then(c => {
                c.createEmbed({
                    title: `List numero ${j + 1} of stuff you can sub too :D`,
                    description: messages[j],
                    color: 0x0dff00
                });
            });
        }
        msg.channel.createMessage(`Sending you the games & subs list ${msg.author.mention}..`);
    }
}, {
    guildOnly: true
});
