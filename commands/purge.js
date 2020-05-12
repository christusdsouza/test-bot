let lastCmdTime;
module.exports = {
    alias: "clean",
    syntax: "<amount>",
    description: "Get rid off some messages [Limit:100]",
    cooldown: "5s",
    /**
     * Clear messages in bulk. Not messages older than 2 weeks
     * @params {Collection} message
     * @params {Array} args: args[0]: GuildMember member, args[1]: int count
     */
    async execute(message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`))
            return message
                .reply(
                    'Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` +
                    'Sorry, you don\'t have permissions to use this!')
                        .then((msg) => msg.delete({ timeout: 10000 }));

        if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
        else var now = message.createdTimestamp;
        if (now - lastCmdTime <= 5000)
            return message
                .reply('Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` +
                    ', Shush, You gotta a lot of trash there, busy cleaning up')
                .then((msg) => msg.delete({ timeout: 3000 }));

        // This command removes all messages from all users in the channel, up to 100.
        // get the delete count, as an actual number.
        const deleteCount = parseInt(args[0], 10);
        message.delete();

        // Ooooh nice, combined conditions. <3
        if (!deleteCount || deleteCount < 0 || deleteCount > 1000)
            return message
                .reply(
                    "Please provide a number between 2 and 100 for the number of messages to delete"
                )
                .then((msg) => msg.delete({ timeout: 10000 }));

        // So we get our messages, and delete them. Simple enough, right?
        const fetched = await message.channel.messages.fetch({
            limit: deleteCount,
        });
        message.channel
            .bulkDelete(fetched)
            .catch((error) =>
                message
                    .reply(`Couldn't delete messages because of: ${error}`)
                    .then((msg) => msg.delete({ timeout: 10000 }))
            );
    },
};
