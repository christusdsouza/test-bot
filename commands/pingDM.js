module.exports = {
	syntax: "<user> <message>",
	description: "For the weak hearted, speak it out in anonmity\nShoot A Directmessage via via",
	cooldown: '2s',
	async execute(message, args, client) {
		try {
			if (!prevPingCmd)  prevPingCmd = message.createdTimestamp;
			else  var now = message.createdTimestamp;
			if (now - prevPingCmd <= 2000)    
				return message.reply('wait, zara sabar karoa...').then(msg => msg.delete(3));

			let member = message.mentions.members.first() || message.guild.members.some((member) => {
				if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.id === args[0]) return true;
				else if (member.user.discriminator === args[0]) return true;
				else return false;
			});
			if (args[0]) {
				if (member) {
					var text = args.slice(1).join(' ');
					member.send(text).then(message.delete(3000));
					message.reply("*wink wink* your whisper has travelled overseas successfully")
						.then(msg => msg.delete(5000));
				}
				else {
					return message.channel.send(`FFS who is this mf youre trying to ping man !`);
				}
			}
			else return;
		}
		catch (error) {
			console.log(error)
		};
	}
};