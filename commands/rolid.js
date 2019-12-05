module.exports = {
	syntax: " <role-name>",
	description: "Grab a roles ID by mentioning its name\n EZPZ",
	execute(message,args) {
		let myRole = message.guild.roles.find(role => role.name === args.join(' '));
	   return message.channel.send(myRole.id);
}};