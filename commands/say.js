let prevPingCmd;
module.exports = {
    alias: 's',
    syntax: "<message>",
    description: "Echo messages through bot",
    cooldown: '2s',
    execute(message, args) {
        if (!prevPingCmd) prevPingCmd = message.createdTimestamp;
        else var now = message.createdTimestamp;
        if (now - prevPingCmd <= 2000)
            return message.reply('Looks like you got a lot to say @||.....||')
                .then(msg => msg.delete(3));

        // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete(10)
            .catch(O_o => { });
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
    }
};