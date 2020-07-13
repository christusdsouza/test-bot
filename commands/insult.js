const insult = require('./../assets/insult.json');
let lastCmdTime;
module.exports = {
	alias: ['in', 'roast', 'burn', 'target'],
	syntax: " $$$~Youre looking for a syntax?",
	cooldown: "2s",
	description: "Just nuke that faggot already! So dont forget to mention THEM. **Becareful not to hurt yourself** ~experimental~",
	execute(message, args) {
		if (!lastCmdTime)  lastCmdTime = message.createdTimestamp;
		else  const now = message.createdTimestamp;
		if ((now - lastCmdTime) <= 2000)
			return message.reply(
				'Cooldown: ' + `${new Date(now - lastCmdTime).getSeconds}` +
				', OOps, a little bit quick there retard, remain in your fucking habitual limit!!!')
					.then(msg => msg.delete({timeout:2000}));

		const rand = Math.floor((Math.random() * 10) % insult.insult.length);
		if (!args.length) return message.reply(insult.insult[rand]);
		
		let member = message.mentions.members.first() || message.guild.members.cache.find((member) => {
			if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
			else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
			else if (member.user.id === args[0]) return true;
			else if (member.user.discriminator === args[0]) return true;
			else return false;
		}) || "";

		if (args[0] === '<@507797397640839170>' || member.user.id === `507797397640839170`)
			return message.reply('YOU ' + insult.insult[rand] + '\nAint insulting myself you stupid bitch!!!');
		else if (member) return message.channel.send('<@'+member.user.id+'>' + ' ' + args.splice(1, args.length).join(' ') + " " + insult.insult[rand]);
		else return message.channel.send(args.join(' ') + " " + insult.insult[rand]);
	}
};