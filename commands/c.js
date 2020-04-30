const params = ['file', 'files', 'attch', 'attachments'];
let prevPingCmd;
module.exports = {
	syntax: "[" + params.join('/') + "]",
	description: "Call this to clean up bot clutter",
	alias: 'cls',
	cooldown: '8s',
	async execute(message, args) {
		try {
			if (!prevPingCmd)	prevPingCmd = message.createdTimestamp;
			else	var now = message.createdTimestamp;
			if (now - prevPingCmd <= 8000)	return message.reply('OOps, a little bit too quick there!').then(msg => msg.delete(3));

			message.delete();
			const fetched = await message.channel.fetchmessages();

			if (args.length && params.includes(args[0])) return message.channel.bulkDelete(fetched.filter(auth => auth.attachments.first()), true);
			else if (args.length && args[0] == 'bot') return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true));
			else return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true), true);
		} catch (error) { message.reply(`Couldn't delete messages because of: ${error}`); }
	}
};