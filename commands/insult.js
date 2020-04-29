const insult = require('./../assets/insult.json');
let prevPingCmd;
module.exports = {
	alias: "in",
	syntax: "$$$~Youre looking for a syntax?",
	description: "Just nuke that faggot already! So dont forget to mention THEM. **Becareful not to hurt yourself** ~experimental~",
	cooldown: '5s',
	execute(message, args) {
		if (!prevPingCmd)
			prevPingCmd = message.createdTimestamp;
		else
			var now = message.createdTimestamp;
		if (now - prevPingCmd <= 5000) return message.reply('OOps, a little bit quick there retard, remain in your fucking habitual limit!!!').then(message.delete(3));

		var len = insult.insult.length;
		var rand = Math.floor((Math.random() * 10) % len);
		if (!args[0])
			return message.reply(insult.insult[rand]);
		else if (args[0] === '<@631776475858599936>')
			return message.reply(insult.insult[rand] + '\nAint insulting myself you stupid bitch!!!');
		else
			return message.channel.send(args.join(' ') + " " + insult.insult[rand]);
	}
};