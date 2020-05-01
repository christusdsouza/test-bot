const Discord = require("discord.js");
let prevPingCmd;
module.exports = {
	syntax: "<note-message>",
	description: "Leave a note in the chat for your fellow users",
	cooldown: '5s',
	execute(message, client, args) {
		if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
			if (!prevPingCmd) prevPingCmd = message.createdTimestamp;
			else var now = message.createdTimestamp;
			if (now - prevPingCmd <= 5000)
				return message.reply('OOps! a little bit too quick there, get a hold on your feelings...')
					.then(msg => msg.delete(3000));
		}

		message.delete().catch(O_o => { });
		const embed = new Discord.RichEmbed()
			.setColor(0xffff00)
			.setTitle('Note by ' + message.author.username)
			.setDescription(args.join(' '))
			.setThumbnail(message.guild.iconURL)
			.setTimestamp()
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL);
		message.channel.send(embed);
	}
};