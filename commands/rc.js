const MessageEmbed = require('discord.js').MessageEmbed;
let lastCmdTime;
module.exports = {
	syntax: "<role-name/id> <color-code>",
	description: "Assign a fancy color to any role\nHex color-codes are appreciated",
	cooldown: '5s',
	perms: "MANAGE_ROLES",
	/**
	 * @params {Collection} message
	 * @params {Array} args: args[0]: String role-name OR Number role-id, args[1]: int hex-color-code 
	 */
	execute(message, args) {
		if (!message.member.hasPermission(`MANAGE_ROLES`))
			return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete({timeout:10000}));
			
		if (!lastCmdTime)  lastCmdTime = message.createdTimestamp;
		else  var now = message.createdTimestamp;
		if ((now - lastCmdTime) <= 5000) 
			return message.reply(
				'Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` +
				'Enough Homo, thats enough of Colors...')
					.then(msg => msg.delete({timeout:3000})
			);
		var regex = new RegExp()
		var role = message.guild.roles.cache.find(role => role.name.toUpperCase() === args[0].toUpperCase() || role.id === args[0]);
		if (role) {
			
			role.edit({ color: '0x'+colorx });
			var embed = new MessageEmbed()
				.setColor(colorx)
				.setDescription("Changed to #" + args[1]);
			return message.channel.send(embed);
		}
		return message.reply("No such role").then(msg => msg.delete({timeout:10000}));
	}
};	