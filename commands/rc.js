const d = require('discord.js');
var description = "Role Color";
module.exports = {
	syntax: "<role-name> <color-code>",
	description: "Assign a fancy color to any role\nHex color-codes are appreciated",
	cooldown: '5s',
	execute(message, args, client) {
		if (!prevPingCmd)
			prevPingCmd = message.createdTimestamp;
		else
			var now = message.createdTimestamp;
		if (now - prevPingCmd <= 5000) return message.reply('Enough Homo, thats enough of Colors...').then(message.delete(3));

		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!");
		var role = message.guild.roles.find(role => role.name === args[0]);
		if (role) {
			var colorx = '0x' + args[1].split("#");
			role.edit({ color: colorx });
			message.channel.send("Changed to #" + args[1]);
		}
		else
			return message.reply("No such role");
	}
};