const params = ['file', 'files', 'attch', 'attachments'];
let lastCmdTime;
module.exports = {
	syntax: "[" + params.join('/') + "]",
	description: "Call this to clean up bot clutter",
	alias: 'cls',
	cooldown: '5s',
	perms: "MANAGE_MESSAGES",
	async execute(message, args) {
		try {
			if (!message.member.hasPermission(`MANAGE_MESSAGES`))
				return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete({ timeout: 10000 }));
			if (!lastCmdTime)  lastCmdTime = message.createdTimestamp;
			else now = message.createdTimestamp;
			if ((now - lastCmdTime) <= 5000) return message.reply(
				'Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` +
				', OOps, a little bit too quick there!')
					.then(msg => msg.delete({timeout:3000}));

			message.delete();
			const fetched = await message.channel.messages.fetch();

			if (args.length && params.includes(args[0])) return message.channel.bulkDelete(fetched.filter(auth => auth.attachments.first()), true);
			else if (args.length && args[0] == 'bot') return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true));
			else return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true), true);
		} catch (error) { message.reply(`Couldn't delete messages because of: ${error}`).then(msg => msg.delete({timeout:10000})); }
	}
};