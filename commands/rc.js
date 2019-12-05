const d = require('discord.js');
var description = "Role Color";
module.exports = {
	syntax: " <role-name> <color-code>",
	description: "Assign a fancy color to any role\nHex color-codes are appreciated",
	execute(message,args,client) {
		var colorx = '0x'+args[1].split("#"); 
		var role = message.guild.roles.find(role => role.name === args[0]);
		role.edit({color: colorx});
		message.channel.send("Changed to #"+args[1]);
}};