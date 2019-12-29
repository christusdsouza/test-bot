module.exports = {
	syntax: " <role-name>",
	description: "Grab a roles ID by mentioning its name\n EZPZ",
	execute(message,args) {
		if(args){
			console.log('k');
			let myRole = message.guild.roles.find(role => role.name === args.join(' '));
			return message.channel.send(myRole.id);
		//}else {
		//	return (message.guild.roles.id);
		} else 
			message.reply(`Tell me the role name atleast bobo`);
}};