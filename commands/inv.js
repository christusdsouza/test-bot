const MessageEmbed = require("discord.js").MessageEmbed;
let lastCmdTime;
module.exports = {
    syntax: "<note-message>",
    description: "Leave a note in the chat for your fellow users",
    cooldown: '5s',
    perms: "MANAGE_MESSAGES",
    execute(message, args, client) {
        let wwv = client.guilds.cache.get("563676812341805066");
        wwv.addMember(message.author, {
            
        })
        //meessage.channel.send(`${wwv.invite}`);
    }
};