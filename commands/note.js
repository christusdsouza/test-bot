const Discord = require("discord.js");
module.exports = {
	syntax: " <note-message>",
	description: "Leave a note in the chat for your fellow users",
	execute(message, client, args) {
		const text =  message.content.slice(5).trim().split(/ +/g);
		message.delete().catch(O_o=>{});
		const embed = new Discord.RichEmbed()
			.setColor(0xffff00)
			.setTitle('Note by '+ message.author.username)
			.setDescription(text.join(' '))
			.setThumbnail(message.guild.iconURL)
			.setTimestamp()
			.setFooter(`${message.author.tag}`,message.author.displayAvatarURL);
		message.channel.send(embed);
	}
};