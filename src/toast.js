const toastert = {
    toasty: (msg, bot) => {
        if(msg.content.includes("🍞")) {
            bot.createMessage(msg.channel.id, `Ding! ${msg.author.mention}, your toast is ready! <a:atoast:471060702384357397>`)
        }
    },
    dunes: (msg, bot) => {
        let s = msg.content.toLowerCase();
        if(s.includes("sand dunes")) {
            bot.createMessage(msg.channel.id, `https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/8EADDB13-1DD8-B71B-0B43FFA9BE6A3D82.jpg?width=950&quality=90&mode=crop`)
        }
    }
}

module.exports = toastert;
