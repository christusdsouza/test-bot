const d = require('discord.js');
var description = "Role Color";
module.exports = {
	syntax: "<role-name> <color-code>",
	description: "Assign a fancy color to any role\nHex color-codes are appreciated",
	cooldown: '5s',
	/*** 
	 * @params Array args ; args[0]: String role-name, args[1]: int hex-color-code 
	 **/
	execute(message, args) {
		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete(10000));
			
		if (!prevPingCmd)  prevPingCmd = message.createdTimestamp;
		else  var now = message.createdTimestamp;
		if (now - prevPingCmd <= 5000) 
			return message.reply('Enough Homo, thats enough of Colors...')
				.then(msg => msg.delete(3000));

		var role = message.guild.roles.find(role => role.name === args[0] || role.id === args[0]);
		if (role) {
			var colorx = '0x' + args[1].split("#");
			role.edit({ color: colorx });
			return message.channel.send("Changed to #" + args[1]);
		}
		return message.reply("No such role").then(msg => msg.delete(10000));
	}
};