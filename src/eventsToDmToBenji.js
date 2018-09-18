const config = require('../config');
const bot = config.eris;

const ben = config.people.ben;

bot.on('guildMemberAdd', (guild, member) =>  {
    bot.getDMChannel(ben).then(c => {
        bot.createMessage(c.id, `**${member.username}** just joined the ${guild.name}!`);
    });
});

bot.on('guildMemberRemove', (guild, member) =>  {
    bot.getDMChannel(ben).then(c => {
        bot.createMessage(c.id, `**${member.username}** just left the ${guild.name}!`);
    });
});

bot.on('guildBanAdd', (guild, member) =>  {
    bot.getDMChannel(ben).then(c => {
        bot.createMessage(c.id, `**${member.username}** just got bannned from the ${guild.name}!`);
    });
});
