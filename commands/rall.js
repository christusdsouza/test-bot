const Discord = require("discord.js");
let prevPingCmd;

module.exports = {
	alias: ['roles','allroles'],
	description: "List all roles with ID",
	cooldown: '1m',
	execute(message) {
		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return ;

		if (!prevPingCmd) prevPingCmd = message.createdTimestamp;
		else var now = message.createdTimestamp;
		if (now - prevPingCmd <= 60000) 
			return message.reply('This is ILLEGAL, Calm DOWN')
				.then(msg => msg.delete(5000));

		let allRoles = message.guild.roles;
		for (i of allRoles)  message.channel.send(i);			//i.Role.name & i.Role.id
			
	}
};
