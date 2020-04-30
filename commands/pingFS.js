let prevPingCmd;
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
			if (!prevPingCmd)  prevPingCmd = message.createdTimestamp;
			else  var now = message.createdTimestamp;
			if (now - prevPingCmd <= 31000)
				return message.reply('Scoot away dumb bitch, I have some mentions to do...')
					.then(msg => msg.delete(3));

			if (!(args.length < 2)) return message.reply("You missed some stuff");
			let chan = client.channels.find(chan => chan.id === `647162352797745172`);
			let member = message.mentions.members.first() || message.guild.members.some((member) => {
				if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.id === args[0]) return true;
				else if (member.user.discriminator === args[0]) return true;
				else return false;
			});
			if (!member) return message.reply(`FFS who is this mf youre trying to ping man !`);
			if (!isNaN(args[1]) && !args[1] <= 100) return message.reply("Mention a proper count cono within 100");

			//Ping starts here
			message.channel.send("Nuking the PING engine");
			for (let i = 0; i < args[1]; i++) {
				chan.send(args[0]);
			}
			return message.channel.send("DONE FFS");
		} catch (error) {
			message.channel.send(`${error}`);
			console.log(error)
		}
	}
};