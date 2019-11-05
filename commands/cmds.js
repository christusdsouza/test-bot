const Discord = require("discord.js");
module.exports = {
	execute(message,args,client) {
	var chan = client.channels.get('569190661081923612');
	const panelCmds = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('WWV Bot Command list')
		.setDescription('')
		.setThumbnail(message.guild.iconURL)
		.addField('/ping : API Latency', '/ping')
		.addField('/pingFS @user times-to-ping', '/ping @Faggot 69', true)
		.addBlankField()
		.addField('Server Level Commands:','/ban | /mute | /kick | /purge')
		//.addField('/ban @user')
		//.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter(`Note:\npings are sent in `+chan.name);
	return message.channel.send(panelCmds);
	}
};