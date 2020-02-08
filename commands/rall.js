const Discord = require("discord.js");
//const Collection = require("discord.js/src/Collection");

module.exports = {
	description: "List all roles with ID",
	execute(message,args,client) {
		if(!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!");
			let allRoles = message.guild.roles;
			for (i of allRoles) {
				console.log(i);
				message.channel.send(i);//i.Role.name+': '+i.Role.id);
			
		}
	}
};
