const MessageEmbed = require("discord.js").MessageEmbed;
let lastCmdTime;
module.exports = {
	syntax: "<note-message>",
	description: "Leave a note in the chat for your fellow users",
	cooldown: '5s',
	/**
 	* TO create proper embeds for important/meaningful notes
 	* @param {Collection} message 
	* @param {Array} args: [0]: member/GuildMember to credit/quote OR Anything 
 	*/
	execute(message, args) {
		if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
			if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
			else var now = message.createdTimestamp;
			if (now - lastCmdTime <= 5000)
				return message.reply('OOps! a little bit too quick there, get a hold on your feelings...')
					.then(msg => msg.delete({timeout:3000}));
		}

		message.delete().catch(O_o => { });
		
		let member = message.mentions.members.first() || message.guild.members.cache.find((member) => {
			if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
			else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
			else if (member.user.id === args[0]) return true;
			else if (member.user.discriminator === args[0]) return true;
			else return false;
		});

		var author, permCheckForCustomAuthor = message.member.hasPermission(`ADMINISTRATOR`) || !message.member.hasPermission(`MANAGE_MESSAGES`);
		if(member && permCheckForCustomAuthor) {
			args.shift(); 
			author = member.user; 
		} else {
			author = message.author;
		}
		
		const embed = new MessageEmbed()
			.setColor(0xffff00)
			.setTitle('Note by ' + author.username)
			.setDescription(args.join(' '))
			.setThumbnail(message.guild.iconURL)
			.setTimestamp()
			.setFooter(author.tag, message.author.displayAvatarURL);
		message.channel.send(embed);	
	}
};