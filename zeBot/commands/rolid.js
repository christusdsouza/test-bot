module.exports = {
	execute(message,args) {
		let myRole = message.guild.roles.find(role => role.name === args.join(' '));
	   return message.channel.send(myRole.id);
}};