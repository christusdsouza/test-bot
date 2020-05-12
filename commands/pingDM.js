let lastCmdTime;
module.exports = {
	syntax: "<user> <message>",
	alias: "dm",
	description: "For the weak hearted, speak it out in anonmity\nShoot A Directmessage via via",
	cooldown: '2s',
	/**
	 * A Direct Message command sent via BOT
	 * @param {Collection} message 
	 * @param {Array} args: [0]: member/GuildMember, [1...]: Text
	 * @param {this.Client} client 
	 */
	async execute(message, args, client) {
		try {
			if (!lastCmdTime)  lastCmdTime = message.createdTimestamp;
			else  var now = message.createdTimestamp;
			if (now - lastCmdTime <= 2000)    
				return message.reply('wait, zara sabar karo...').then(msg => msg.delete({timeout:3000}));

			let member = message.mentions.members.first() || message.guild.members.cache.find((member) => {
				if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
				else if (member.user.id === args[0]) return true;
				else if (member.user.discriminator === args[0]) return true;
				else return false;
			});
			if (args[0]) {
				if (member) {
					if(member.id===client.user.id || member.user.bot)  return message.reply("Don't simp on me nigga!!!");
					var text = args.slice(1).join(' ');
					member.send(text).then(message.delete({timeout:3000}));
					message.reply("*wink wink* your whisper has travelled overseas successfully")
						.then(msg => msg.delete({timeout:3000}));
				}
				else {
					return message.channel.send(`FFS who is this mf youre trying to ping man !`)
						.then(msg => msg.delete({timeout:10000}));
				}
			}
			else return;
		}
		catch (error) {
			console.log(error)
		};
	}
};