const Discord = require("discord.js");
let prevPingCmd;
//const Collection = require("discord.js/src/Collection");

module.exports = {
	alias: ['roles','allroles'],
	description: "List all roles with ID",
	cooldown: '1m',
	execute(message,args,client) {
		if (!prevPingCmd)
			prevPingCmd = message.createdTimestamp;
		else
			var now = message.createdTimestamp;
		if (now - prevPingCmd <= 60000) return message.reply('This is ILLEGAL, Calm DOWN').then(message.delete(3));

		if(!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!");
			let allRoles = message.guild.roles;
			for (i of allRoles) {
				message.channel.send(i);//i.Role.name+': '+i.Role.id);
			
		}
	}
};
