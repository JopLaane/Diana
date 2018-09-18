const config = require('../config');
const bot = config.eris;

const RainbowSixApi = require('rainbowsix-api-node');
const R6 = new RainbowSixApi();

const r6FindCommand = bot.registerCommand("r6find", (msg, args) => {

    bot.sendChannelTyping(msg.channel.id);

    let username = args[1];
    let platform = args[0];
    let gamemode = args[2];

    //uplay, xone, ps4
    //is typing while getting data!!!!!!!!!!
    //Get stats on the user on that platform
    R6.stats(username, platform, false/*optional true or false if you want operator details or not*/).then(response => {
        console.log(response);
        makeR6Embed(response, msg, gamemode);
    }).catch(error => {
        console.error(error);
    });
});

const makeR6Embed = (res, msg, type) => {
    let member = msg.author;
    let player = res.player;
    let stats = res.player.stats;
    let overall = stats.overall;
    let ranked = stats.ranked;
    let casual = stats.casual;
    let progress = stats.progression;

    // /r6find uplay Joppie_DL_INF
    bot.createEmbed(msg.channel.id, {
        author: {
            name: `${member.username} requested ${player.username}'s stats`,
            icon_url: member.avatarURL
        },
        color: 0xff0099,
        fields: [
            UserData(type),
            values(type, player, progress, overall, casual, ranked)
        ]
    });
}

//operator commands
const UserData = (type) => {
    if(type == "overall") {
        return {
            name: "User Data:",
            value:
            "**Account name:**\r\n" +
            "**Platform:**\r\n" +
            "**Level/XP:**\r\n\r\n" +
            //----------
            "**__Overall__:**\r\n" +
            "**Time played:**\r\n" +
            "**Wins:**\r\n" +
            "**Losses:**\r\n" +
            "**Win/Loss ratio:**\r\n" +
            "**Total games played:**\r\n\r\n" +
            //----------
            "**__In-game stats:__**\r\n" +
            "**Total Deaths:**\r\n" +
            "**Total Kills:**\r\n" +
            "**Kill/Death ratio:**\r\n" +
            "**Revives:**\r\n" +
            `**Suicides:**\r\n`+
            `**Reinforcements deployed:**\r\n`+
            `**Barricades built:**\r\n`+
            `**Steps moved:**\r\n`+
            `**Bullets fired:**\r\n`+
            `**Bullets hit:**\r\n`+
            `**Headshots:**\r\n`+
            `**Melee kills:**\r\n`+
            `**Penetration kills:**\r\n`+
            `**Assists:**\r\n`,
            inline: true
        }
    } else if (type == "ranked") {
        return {
            name: "User Data:",
            value:
            "**Account name:**\r\n" +
            "**Platform:**\r\n" +
            "**Level/XP**\r\n\r\n" +
            "**__Ranked:__**\r\n" +
            "**Has played ranked:**\r\n" +
            `**Wins:**\r\n`+
            `**Losses:**\r\n`+
            `**Win/Loss ratio:**\r\n`+
            `**Kills:**\r\n`+
            `**Deaths:**\r\n`+
            `**Kill/Death ratio:**\r\n`+
            `**Playtime:**\r\n`,
            inline: true
        }
    } else if (type == "casual") {
        return {
            name: "User Data:",
            value:
            "**Account name:**\r\n" +
            "**Platform:**\r\n" +
            "**Level/XP**\r\n\r\n" +
            "**__Casual:__**\r\n" +
            "**Has played casual:**\r\n" +
            `**Wins:**\r\n`+
            `**Losses:**\r\n`+
            `**Win/Loss ratio:**\r\n`+
            `**Kills:**\r\n`+
            `**Deaths:**\r\n`+
            `**Kill/Death ratio:**\r\n`+
            `**Playtime:**\r\n`,
            inline: true
        }
    } else {
        return {
            name: "User Data:",
            value:
            "**Account name:**\r\n" +
            "**Platform:**\r\n" +
            "**Level/XP:**\r\n\r\n" +
            //-----------
            "**__Overall__:**\r\n" +
            "**Time played:**\r\n" +
            "**Wins:**\r\n" +
            "**Losses:**\r\n" +
            "**Win/Loss ratio:**\r\n" +
            "**Total games played:**\r\n\r\n" +
            //-----------
            "**__In-game stats:__**\r\n" +
            "**Total Deaths:**\r\n" +
            "**Total Kills:**\r\n" +
            "**Kill/Death ratio:**\r\n" +
            "**Revives:**\r\n" +
            `**Suicides:**\r\n`+
            `**Reinforcements deployed:**\r\n`+
            `**Barricades built:**\r\n`+
            `**Steps moved:**\r\n`+
            `**Bullets fired:**\r\n`+
            `**Bullets hit:**\r\n`+
            `**Headshots:**\r\n`+
            `**Melee kills:**\r\n`+
            `**Penetration kills:**\r\n`+
            `**Assists:**\r\n`,
            inline: true
        }
    }
}

const values = (type, player, progress, overall, casual, ranked) => {
    let totalWins = ranked.wins + casual.wins;
    let totalLosses = ranked.losses + casual.losses;
    let totalWLR = totalWins / totalLosses;

    let totalKills = ranked.kills + casual.kills;
    let totalDeaths = ranked.deaths + casual.deaths;
    let totalKD = totalKills / totalDeaths;

    if(type == "overall") {
        return {
            name: "Values:",
            value:
            `${player.username}\r\n` +
            `${player.platform}\r\n` +
            `${progress.level} / ${progress.xp}XP` +
            `\r\n\r\n\r\n` +
            `${Math.round(((ranked.playtime + casual.playtime)/3600)* 100) / 100} Hours\r\n` +
            `${totalWins}\r\n` +
            `${totalLosses}\r\n` +
            `${Math.round(totalWLR * 100) / 100}\r\n` +
            `${totalWins + totalLosses}` +
            `\r\n\r\n\r\n` +
            `${totalDeaths}\r\n` +
            `${totalKills}\r\n` +
            `${Math.round(totalKD * 100) / 100}\r\n` +
            `${overall.revives}\r\n` +
            `${overall.suicides}\r\n` +
            `${overall.reinforcements_deployed}\r\n` +
            `${overall.barricades_built}\r\n` +
            `${overall.steps_moved}\r\n` +
            `${overall.bullets_fired}\r\n` +
            `${overall.bullets_hit}\r\n` +
            `${overall.headshots}\r\n` +
            `${overall.melee_kills}\r\n` +
            `${overall.penetration_kills}\r\n` +
            `${overall.assists}\r\n`,
            inline: true
        }
    } else if(type == "ranked") {
        return {
            name: "Values:",
            value:
            `${player.username}\r\n` +
            `${player.platform}\r\n` +
            `${progress.level} / ${progress.xp}XP` +
            `\r\n\r\n\r\n` +
            `${ranked.has_played}\r\n` +
            `${ranked.wins}\r\n` +
            `${ranked.losses}\r\n` +
            `${ranked.wlr}\r\n` +
            `${ranked.kills}\r\n` +
            `${ranked.deaths}\r\n` + //Math.round(num * 100)
            `${ranked.kd}\r\n` +
            `${Math.round((ranked.playtime/3600)* 100) / 100}  Hours\r\n`,
            inline: true
        }
    } else if(type == "casual") {
        return {
            name: "Values:",
            value:
            `${player.username}\r\n` +
            `${player.platform}\r\n` +
            `${progress.level} / ${progress.xp}XP` +
            `\r\n\r\n\r\n` +
            `${casual.has_played}\r\n` +
            `${casual.wins}\r\n` +
            `${casual.losses}\r\n` +
            `${casual.wlr}\r\n` +
            `${casual.kills}\r\n` +
            `${casual.deaths}\r\n` +
            `${casual.kd}\r\n` +
            `${Math.round((casual.playtime/3600)* 100) / 100} Hours\r\n`,
            inline: true
        }
    } else {
        return {
            name: "Values:",
            value:
            `${player.username}\r\n` +
            `${player.platform}\r\n` +
            `${progress.level} / ${progress.xp}XP` +
            `\r\n\r\n\r\n` +
            `${Math.round(((ranked.playtime + casual.playtime)/3600)* 100) / 100} Hours\r\n` +
            `${totalWins}\r\n` +
            `${totalLosses}\r\n` +
            `${Math.round(totalWLR * 100) / 100}\r\n` +
            `${totalWins + totalLosses}` +
            `\r\n\r\n\r\n` +
            `${totalDeaths}\r\n` +
            `${totalKills}\r\n` +
            `${Math.round(totalKD * 100) / 100}\r\n` +
            `${overall.revives}\r\n` +
            `${overall.suicides}\r\n` +
            `${overall.reinforcements_deployed}\r\n` +
            `${overall.barricades_built}\r\n` +
            `${overall.steps_moved}\r\n` +
            `${overall.bullets_fired}\r\n` +
            `${overall.bullets_hit}\r\n` +
            `${overall.headshots}\r\n` +
            `${overall.melee_kills}\r\n` +
            `${overall.penetration_kills}\r\n` +
            `${overall.assists}\r\n`,
            inline: true
        }
    }
}

const r6FindOperatorCommand = bot.registerCommand("r6operator", (msg, args) => {

    bot.sendChannelTyping(msg.channel.id);

    let username = args[1];
    let platform = args[0];
    let operator;

    // .r6operator uplay Joppie_DL_INF
    //uplay, xone, ps4
    //Get stats on the user on that platform
    R6.stats(username, platform, true/*optional true or false if you want operator details or not*/).then(response => {
        //console.log(response.operator_records[0]);
        if(!args[2]) {
            bot.createMessage(msg.channel.id, "What operator would you like the stats for?").then(async function(ms) {
                let responses = await ms.channel.awaitMessages(m => m.content.match(/[a-zA-Z]/g) && m.author.id != bot.user.id, { time: 10000, maxMatches: 1});
                if(responses.length) {
                    operator = responses[0].content.split(" ");

                    makeTheEmbedAndThing(response, operator, username, msg);
                } else {
                    ms.channel.createMessage("No operator chosen...");
                }
            });
        } else if(args[2]) {
            makeTheEmbedAndThing(response, args[2], username, msg);
        }
    }).catch(error => {
        console.error(error);
    });
});

const makeTheEmbedAndThing = (response, operator, username, msg) => {
    let foundSomething = false;
    for(let i = 0; i < response.operator_records.length; i++) {

        if(response.operator_records[i].operator.name.toLowerCase() == operator.toLowerCase()) {
            foundSomething = true;
            let operatorGeneral = response.operator_records[i].operator;
            let operatorStats = response.operator_records[i].stats;

            let totalWLR = operatorStats.wins / operatorStats.losses;

            let totalKD = operatorStats.kills / operatorStats.deaths;

            let role = '';

            if(operatorGeneral.role == "atk") {
                role = "Attack";
            } else if(operatorGeneral.role == "def"){
                role = "Defense";
            }

            bot.createEmbed(msg.channel.id, {
                author: {
                    name: `${msg.author.username} requested ${username}'s stats on ${operatorGeneral.name}`,
                    icon_url: operatorGeneral.images.badge
                },
                color: 0xff0099,
                fields: [
                    {
                        name: "Operator Data:",
                        value:
                        "**Name:**\r\n" +
                        "**Role:**\r\n" +
                        "**Unit:**\r\n\r\n" +
                        "**__In-game Stats:__**\r\n" +
                        "**Time played:**\r\n" +
                        "**Wins:**\r\n" +
                        "**Losses:**\r\n" +
                        "**Win/Loss ratio:**\r\n" +
                        "**Total games played:**\r\n" +
                        "**Kills:**\r\n" +
                        "**Deaths:**\r\n" +
                        "**K/D ratio:**\r\n\r\n" +
                        "***__ABILITY STATS COMING SOON__***",
                        inline: true
                    },
                    {
                        name: "Values:",
                        value://¯\\_(ツ)_/¯
                        `${operatorGeneral.name}\r\n` +
                        `${role}\r\n` +
                        `${operatorGeneral.ctu}\r\n\r\n\r\n` +
                        `${Math.round(((operatorStats.playtime/3600)* 100) / 100)} hours\r\n` +
                        `${operatorStats.wins}\r\n` +
                        `${operatorStats.losses}\r\n` +
                        `${Math.round(totalWLR * 100) / 100}\r\n` +
                        `${operatorStats.played}\r\n` +
                        `${operatorStats.kills}\r\n` +
                        `${operatorStats.deaths}\r\n` +
                        `${Math.round(totalKD * 100) / 100}`,
                        inline: true
                    }
                ]
            });
        }
    }
    if(!foundSomething) {
        bot.createMessage(msg.channel.id, `couldn\'t find this operator: ${operator}`);
    }
}
