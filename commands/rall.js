const Discord = require("discord.js");
//const Collection = require("discord.js/src/Collection");

module.exports = {
	description: "Critical: Invite creation, only for Admins/Owner",
	execute(message,args,client) {
		if(message.author.id === `311761674241835009`) {
			let allRoles = message.guild.roles;
			for (i of allRoles) {
				console.log(i);
				message.channel.send(i);//i.Role.name+': '+i.Role.id);
			}
		}
	}
};