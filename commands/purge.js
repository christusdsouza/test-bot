let prevPingCmd;
module.exports = {
    alias: 'clean',
    syntax: "<amount>",
    description: "Get rid off some messages [Limit:100]",
    cooldown: '5s',
    /***
     * @params message Collection
     * @params args Array; args[0]: GuildMember member, args[1]: int count
     */
    async execute(message, args) {
        if (!message.member.hasPermission(`MANAGE_messageS`))
            return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete(10000));

        if (!prevPingCmd)  prevPingCmd = message.createdTimestamp;
        else  var now = message.createdTimestamp;
        if (now - prevPingCmd <= 5000)
            return message.reply('Shush, You gotta a lot of trash there, busy cleaning up')
                .then(msg => msg.delete(3000));

        // This command removes all messages from all users in the channel, up to 100.
        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);
        message.delete();

        // Ooooh nice, combined conditions. <3
        if (!deleteCount || deleteCount < 0 || deleteCount > 1000)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete").then(msg => msg.delete(10000));

        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.fetchmessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`).then(msg => msg.delete(10000)));
    }
};
