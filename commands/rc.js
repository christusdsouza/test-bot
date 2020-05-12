const MessageEmbed = require('discord.js').MessageEmbed;
module.exports = {
	syntax: "<role-name> <color-code>",
	description: "Assign a fancy color to any role\nHex color-codes are appreciated",
	cooldown: '5s',
	/**
	 * @params {Collection} message
	 * @params {Array} args: args[0]: String role-name, args[1]: int hex-color-code 
	 */
	execute(message, args) {
		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete({timeout:10000}));
			
		if (!lastCmdTime)  lastCmdTime = message.createdTimestamp;
		else  var now = message.createdTimestamp;
		if (now - lastCmdTime <= 5000) 
			return message.reply('Enough Homo, thats enough of Colors...')
				.then(msg => msg.delete({timeout:3000}));
		var role = message.guild.roles.cache.find(role => role.name === args[0] || role.id === args[0]);
		if (role) {
			var colorx = '0x' + args[1].split("#");
			role.edit({ color: colorx });
			var embed = new MessageEmbed()
				.setColor(colorx)
				.setDescription("Changed to #" + args[1]);
			return message.channel.send(embed);
		}
		return message.reply("No such role").then(msg => msg.delete({timeout:10000}));
	}
};