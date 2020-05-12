let lastCmdTime;
module.exports = {
	alias: "stag",
	syntax: " <user> <amount>",
	description: "Annoy that faggot with mass pings [Limit:100]",
	cooldown: '31s',
	/***
	 * @params Collection message
	 * @params Array args; args[0]: GuildMember member, args[1]: int count
	 **/
	async execute(message, args) {
		try {
			if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
				if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
				else var now = message.createdTimestamp;
				if (now - lastCmdTime <= 31000)
					return message.reply('Scoot away dumb bitch, I have some mentions to do...')
						.then(msg => msg.delete({timeout:3000}));
			}
			if (args.length < 2) return message.reply("You missed some stuff").then(msg => msg.delete({timeout:10000}));
			let chan = message.guild.channels.cache.find(chan => chan.id === `647162352797745172`);
			let member = message.mentions.members.first() || message.guild.members.cache.find((member) => {
				if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.id === args[0]) return true;
				else if (member.user.discriminator === args[0]) return true;
				else return false;
			});
			var count = parseInt(args[1]);
			if (!member) return message.reply(`FFS who is this mf youre trying to ping man !`).then(msg => msg.delete({timeout:10000}));
			if (!isNaN(count) && !count <= 100) return message.reply("Mention a proper count cono within 100").then(msg => msg.delete({timeout:10000}));

			//Ping starts here
			message.channel.send("Nuking the PING engine").then(msg => msg.delete({timeout:10000}));
			for (let i = 0; i < count; i++) {
				chan.send(args[0]);
			}
			return message.channel.send("DONE FFS");
		} catch (error) {
			message.channel.send(`${error}`);
			console.log(error)
		}
	}
};