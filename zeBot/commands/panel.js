var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];
module.exports = {
	execute(message) {
	  const panelRE = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('WWV Bots Panel')
	.setDescription('[...]')
	.setThumbnail(message.guild.iconURL)
	.addField('/ping', 'API Latency')
	//.addBlankField()
	//.addField('Inline field title', 'Some value here', true)
	//.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	//.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
	message.channel.send(panelRE)
		.then((m) => {
			m.react(reaction_numbers[0])
			
			m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === reaction_numbers[0]) {
					message.reply('This is zero.');
				} else {
					message.reply('NaN');
				}
	})
	.catch(collected => {
		message.reply('You ran out of time');
	});
  });
}};