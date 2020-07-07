//const MessageEmbed = require("discord.js").MessageEmbed;
let lastCmdTime;

module.exports = {
	alias: ['roles','allroles'],
	description: "List all roles with ID",
	cooldown: '1m',
	perms: "ADMINISTRATOR",
	execute(message) {
		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return ;

		if (!lastCmdTime) lastCmdTime = message.createdTimestamp;
		else var now = message.createdTimestamp;
		if ((now - lastCmdTime) <= 60000) 
			return message.reply('This is ILLEGAL, Calm DOWN')
				.then(msg => msg.delete({timeout:5000}));

		let allRoles = message.guild.roles;
		for (i of allRoles)  message.channel.send(i);			//i.Role.name & i.Role.id
			
	}
};
