//AIzaSyCzVuxxJEoWYT3pkQT0rZ8YsNB-swOhfi0
const config = require('../config');
const bot = config.eris;

//let urbanjsonshit = new config.misc.jsondb("urban", true, true);

// <editor-fold>
const google = require('google')

google.resultsPerPage = 1;

const googleSearchCommand = bot.registerCommand('google', (msg, args) => {

    let toSearch = args.toString();

    google(toSearch, (err, res) => {
        if (err) console.error(err)
        bot.createMessage(msg.channel.id, res.links[0].link);
    });
});
// </editor-fold>

// <editor-fold>
const steamAppLink = "http://store.steampowered.com/app/";
const JSONStream = require('JSONStream');
const SteamStore = require('steam-store');
const store = new SteamStore({
    country:  'EN',
    language: 'en'
});

const searchAppCommand = bot.registerCommand('steam', (msg, args) => {

    let searchTerm = args.toString();

    let link;

    store.steam('storeSearch', searchTerm).then((results) => {
        results = results.map((result) => {
            return result.id;
        });

        link = `${steamAppLink}${results[0]}`;

        bot.createMessage(msg.channel.id, link);
    });
});
// </editor-fold>

// <editor-fold>
const searchUrbanCommand = bot.registerCommand("urban", (msg, args) => {
    let link = "https://www.urbandictionary.com/define.php?term=" + args.toString().replace(/,/g, "+").toLowerCase();
    bot.createMessage(msg.channel.id, `${link}`);
});
// </editor-fold>
