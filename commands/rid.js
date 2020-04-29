let prevPingCmd;
module.exports = {
	syntax: "<role-name>",
	description: "Grab a roles ID by mentioning its name\n EZPZ",
	cooldown: '2s',
	execute(message,args) {
		if (!prevPingCmd)
			prevPingCmd = message.createdTimestamp;
		else
			var now = message.createdTimestamp;
		if (now - prevPingCmd <= 2000) return message.reply('Suspicious amount of searches being pulled up there!').then(message.delete(3));

		if(!message.member.hasPermission(`ADMINISTRATOR`))
			return message.reply("Sorry, you don't have permissions to use this!");
		if(args){
			let myRole = message.guild.roles.find(role => role.name.toLowerCase() === args.join(' ').toLowerCase());
			return message.channel.send(myRole.id);
		} else 
			return message.reply(`Tell me the role name atleast bobo`);
}};