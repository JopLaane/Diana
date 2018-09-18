const config = require('../config');
const bot = config.eris;
const log = require('./logger');
const funcs = require('./globalFunctions');

//let subbableRoles = require('../db/subbableRoles'); // for initialCommand

const jsondb = require('node-json-db');

let subbableRolesDB = new jsondb("db/subbableRoles-db", true, true);
let removedRolesDB = new jsondb("db/removedRoles-db", true, true);

const createCommand = bot.registerCommand('create', (msg, args) => {
    if(msg.channel.id != config.channels.roleconfig) return msg.channel.createMessage(`Wrong channel, ${msg.author.mention}. Please go to: <#386476408840388618>. Thank you!`);
    let roleName = args.toString().replace(/,/g, " ").toLowerCase();

    if(!roleName) {
        msg.channel.createMessage(`Please add a role name to the command. For example: \`/create Super Cool Game\``);
        return;
    } else if (roleName.match(/['"]/g)) { //;<>()\[\]%&^$#€#@!+=-_.,
        msg.channel.createMessage(`Dunn use \`'\` or \`"\` senpai OwO`);
        return;
    }

    let doesExist = msg.channel.guild.roles.find((r) => r.name.toLowerCase() == roleName);

    if(doesExist) {
        msg.channel.createMessage(`${msg.author.mention}, \`${roleName}\` does already exist as a role. Use \`/sub ${roleName}\` to sub to it.`);
        return;
    } else {
        bot.createRole(msg.channel.guild.id, {name: roleName, permissions: 0, color: 0xff00ff, hoist: false, mentionable: true}).then(r => {
            subbableRolesDB.push(`/${roleName}`, `${r.id}`);
            msg.channel.createMessage(`\`${roleName}\` has succesfully been created. Use \`/sub ${roleName}\` to sub to it.`);
            log.info(`Created: ${roleName} as role with id: ${r.id}`);
        });
    }
}, {
    requirements: {
        roleIDs: [config.roles.admin],
    }
});

// sub && unsub
const subCommand = bot.registerCommand('sub', (msg, args) => {
    if(msg.channel.id != config.channels.roleconfig) return msg.channel.createMessage(`Wrong channel, ${msg.author.mention}. Please go to: <#386476408840388618>. Thank you!`);
    let roleName = args.toString().replace(/,/g, " ").toLowerCase();
    let role = msg.channel.guild.roles.find((r) => r.name == roleName);

    if(!role) {
        msg.channel.createMessage(`\`${roleName}\` doesn't exist ${msg.author.mention}, ask one of the admins to create it for you :D`);
    } else {
        if(msg.member.roles.includes(role.id)) {
            msg.channel.createMessage(`You already have this role, ${msg.author.mention}..`)
        } else {
            msg.channel.createMessage(`Adding \`${role.name}\` to your profile...`).then(m => {
                bot.addGuildMemberRole(config.guildID, msg.member.id, role.id);
                m.edit(`Added \`${role.name}\` to your profile succesfully, ${msg.author.mention}.`);
                log.info(`Added ${role.name} to ${msg.author.username}`);
            });
        }
    }
});

const unSubCommand = bot.registerCommand('unsub', (msg, args) => {
    if(msg.channel.id != config.channels.roleconfig) return msg.channel.createMessage(`Wrong channel, ${msg.author.mention}. Please go to: <#386476408840388618>. Thank you!`);
    let roleName = args.toString().replace(/,/g, " ").toLowerCase();
    let role = msg.channel.guild.roles.find((r) => r.name == roleName); //removeGuildMemberRole

    if(!role) {
        msg.channel.createMessage(`\`${roleName}\` doesn't exist ${msg.author.mention}, prolly mispelled it.. Or just eh, ask the admins for help :D`);
    } else {
        if(!msg.member.roles.includes(role.id)) {
            msg.channel.createMessage(`You donut have this role, ${msg.author.mention}..`);
        } else {
            msg.channel.createMessage(`removing \`${role.name}\` from your profile...`).then(m => {
                bot.removeGuildMemberRole(config.guildID, msg.member.id, role.id);
                m.edit(`Removed \`${role.name}\` from your profile succesfully, ${msg.author.mention}.`);
                log.info(`Removed ${role.name} from ${msg.author.username}`);
            });
        }
    }
});


const listRolesCommand = bot.registerCommand('roles', (msg, args) => {
    let obj = subbableRolesDB.getData('/');
    let str = '';
    //log.log(JSON.stringify(subbableRolesDB.getData('/')));
    for (key in obj) {
        console.log(key);
        str += `${key}\r\n`;
    }
    bot.getDMChannel(msg.author.id).then(c => {
        c.createEmbed({
            description: `${str}`,
            author: {
                name: `These are the roles you can sub to using the /sub command`,
                icon_url: bot.user.avatarURL
            },
            color: 0x0061ff,
            footer: { // Footer text
                text: `Lotta roles :D`
            }
        });
    });
});


// const initialCommand = bot.registerCommand('initial', (msg, args) => {
//     let roleString = '';
//     for(let i = 0; i < subbableRoles.subRoles.length; i++) {
//         let role = msg.channel.guild.roles.find((r) => r.id == subbableRoles.subRoles[i]);
//         //roleString += `${role.mention}\r\n`;
//         subbableRolesDB.push(`/${role.name.toLowerCase()}`, `${role.id}`);
//     }
//     //msg.channel.createMessage(roleString);
// }, {
//     requirements: {
//         userIDs: [config.people.jop],
//     }
// });

const eventsNStuff = {
    deleteRoleOnDeletion: (guild, role) => {
        let roleName = role.name.toLowerCase();
        subbableRolesDB.delete(`/${roleName}`);
        removedRolesDB.push(`/Role: ${roleName} was removed.`, `Date: ${funcs.getDateAndTime()}.`);
        log.info(`Deleted ${roleName} from db, id: ${role.id}`);
    }
}

module.exports = eventsNStuff;
