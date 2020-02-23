module.exports = {
	syntax: " <role-name>",
	description: "Grab a roles ID by mentioning its name\n EZPZ",
	execute(message,args) {
		if(!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!");
		if(args){
			let myRole = message.guild.roles.find(role => role.name.toLowerCase() === args.join(' ').toLowerCase());
			return message.channel.send(myRole.id);
		} else 
			return message.reply(`Tell me the role name atleast bobo`);
}};