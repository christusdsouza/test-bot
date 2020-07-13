let lastCmdTime;
module.exports = {
    alias: 's',
    syntax: "<message>",
    description: "Echo messages through bot",
    cooldown: '2s',
    execute(message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
            if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
            else const now = message.createdTimestamp;
            if ((now - lastCmdTime) <= 2000)
                return message.reply('Looks like you got an awful lot to say @||.....||')
                    .then(msg => msg.delete({timeout:3000}));
        }
        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete()
            .catch(O_o => { });
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
    }
};