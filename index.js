const { token } = require('./config'),
    { Client } = require('discord.js');

const bot = new Client();
let selfId = '';

bot.once('ready', () => {
    selfId = bot.user.id;
});

bot.on('message', (message) => {
    const content = message.content;
    const channel = message.channel;

    if (content === '--ping') {
        // noinspection JSIgnoredPromiseFromCall
        channel.send(`Ws: ${bot.ping}`);

        const start = Date.now();

        // Hey PHPStorm, shut up
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        bot.rest.methods.getUser(selfId, false)
            .then(() => {
                const passed = Date.now() - start;

                // noinspection JSIgnoredPromiseFromCall
                channel.send(`Rest: ${passed}`);
            })
            .catch(console.error);
    }
});

bot.login(token)
    .catch(console.error);
