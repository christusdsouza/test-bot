let lastCmdTime;
module.exports = {
	alias: ["pingspam","pingfs","flood"],
	syntax: " <user> /OR/ <text> <count>",
	description: "Annoy a faggot with mass pings [Limit:100] OR flood the chat",
	cooldown: '30s',
	/***
	 * @params Collection message
	 * @params Array args; args[0]: GuildMember member, args[1]: int count
	 **/
	async execute(message, args) {
		try {
			if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
				if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
				else now = message.createdTimestamp;
				if ((now - lastCmdTime) <= 31000)
					return message.reply('Scoot away dumb bitch, keep calm in quartini...')
						.then(msg => msg.delete({timeout:3000}));
			}
			if (args.length < 2) return message.reply("You missed some stuff").then(msg => msg.delete({timeout:10000}));
			let chan = message.guild.channels.cache.find(chan => chan.id === `647162352797745172`);
			let member = message.guild.members.cache.find((member) => {
				if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.id === args[0]) return true;
				else if (member.user.discriminator === args[0]) return true;
				else return false;
			});
			let count = parseInt(args.pop());
			if (isNaN(count) || count >= 100) count = 1;//return message.reply("Mention a proper count cono within 100").then(msg => msg.delete({ timeout: 10000 }));
			if (member) {
			//Member Ping starts here
				message.channel.send("Nuking the PING engine").then(msg => msg.delete({timeout:10000}));
				loop(chan, count, '<@' + member.user.id + '>');
			} else {
			//Text spam starts here
				message.channel.send("Allahu Akbar in 3 secs...");
				message.client.setTimeout(()=>{loop(message.channel, count, args.join(' '))},3);
			}
			return message.channel.send("DONE FFS");
		} catch (error) {
			message.channel.send(`${error}`);
			console.log(error)
		}
	}
};
function loop(channel,count,content) {
	for (let i = 0; i < count; i++)  channel.send(content);
}