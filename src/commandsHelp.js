const commandList = {
    commands: {
        catMod: {
            command: {
                name: `Say`,
                description: `Make the bot say something`,
                usage: `/say <message>`
            },
            command2: {
                name: `Ping`,
                description: `Test if the bot is still alive`,
                usage: `/ping`
            },
            command3: {
                name: `Verify`,
                description: `To verify a user so they get access to the server`,
                usage: `/verify <@mention> <rolename>`
            },
            command4: {
                name: `Purge`,
                description: `Deletes given amount of messges in a channel`,
                usage: `/purge <amount>`
            },

        },
        catGames: {
            command: {
                name: `r6find`,
                description: `Find player's stats :D`,
                usage: `/r6find <platform (uplay, ps4, xone)> <ubi username>`
            },
            command1: {
                name: `r6operator`,
                description: `Find player's operator stats :D If no operator is given, the bot will ask for one. Respond immediately.`,
                usage: `/r6operator <platform (uplay, ps4, xone)> <ubi username> <operator>`,
            },
        },
        catAll: {
            command: {
                name: `Help`,
                description: `Shows this menu thing (don't use in dm)`,
                usage: `/help`
            },
            command2: {
                name: `Dance`,
                description: `Dance.`,
                usage: `/dance`
            },
            command3: {
                name: `Choice`,
                description: `Helps you make choices!`,
                usage: `/choice option1;option2;option3`
            },
            command4: {
                name: `Math. Yes.`,
                description: `Do some math magic!`,
                usage: `/math <problem>`
            },
            command5: {
                name: `Remind you!`,
                description: `Helps you remember stuff!`,
                usage: `/remindme <dd:hh:mm> <reason>`
            },
            command6: {
                name: `Google!`,
                description: `Search the sexy Google machine!`,
                usage: `/google <whatever>`
            },
            command7: {
                name: `Steam`,
                description: `Search through steam`,
                usage: `/steam <whatever>`
            },
            command8: {
                name: `Urban.`,
                description: `Search the urban dictionary!`,
                usage: `/urban <whatever>`
            },
            command9: {
                name: `Celcius to Faheneit and the other way around!`,
                description: `Covert those 2 :P`,
                usage: `/ctof <celcius> or /ftoc <fa-uhnhoit>`
            }
        },

        catDIO: {
            command: {
                name: `Embed`,
                description: `Embeds a string for ya (admin only)`,
                usage: `/embed`
            },
            command2: {
                name: `Joined`,
                description: `Checks when you/someone else joined the DIO.`,
                usage: `/joined <user tag (optional)>`
            },
            command3: {
                name: `Life`,
                description: `Checks when you/someone else joined Dicksword.`,
                usage: `/life <user tag (optional)>`
            },
            command4: {
                name: `List`,
                description: `List a role or every role with their subs`,
                usage: `/list <subbablerolename (optional)`
            },
            command5: {
                name: `Roles`,
                description: `Lists all roles you can sub to.`,
                usage: `/roles`
            },
            command6: {
                name: `Create`,
                description: `Creates a role people can sub to. (admin only)`,
                usage: `/create <role name>`
            },
            command7: {
                name: `Sub`,
                description: `Gets you a new role :>`,
                usage: `/sub <role name>`
            },
            command8: {
                name: `Unsub`,
                description: `Removes yo role boi`,
                usage: `/unsub <role name>`
            },
            command9: {
                name: `Set color`,
                description: `Set your color`,
                usage: `/setcolor #<hexcode>`
            },
            command9: {
                name: `Get color`,
                description: `Get a role's color`,
                usage: `/getcolor <role name>`
            }
        }
    }
}

module.exports = commandList;
