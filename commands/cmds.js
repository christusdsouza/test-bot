const Discord = require("discord.js");
function getstuff(commands,commandName,flag=true) { 
	var stuff=[];
	for(var i=0;i < commandName.length;i++){
		if (flag)
			stuff.push(commands.get(commandName[i]).syntax);
		else
			stuff.push(commands.get(commandName[i]).description);
		if(stuff.length == commandName.length) return (stuff);
	}};
module.exports = {
	alias: "help",
	description: "Get a list of commands",
	async execute(message,args,client,commands) {
		try{
	var colorx = "";
	var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) 
       colorx += letters[(Math.floor(Math.random() * 16))]; 
	const commandName = Array.from(commands.keys());
	const syntx = getstuff(commands,commandName,true);
	const desc = getstuff(commands,commandName,false);
	var chan = client.channels.get('569190661081923612');
	const panelCmds = new Discord.RichEmbed()
		.setColor('0x'+colorx)
		.setTitle('WWV Bot Command list')
		.setThumbnail(message.guild.iconURL)
		.setDescription('Server-prefix `/`     ~modification to prefixes incoming~\nFormat:`commandName w/syntax` Info & Description')
		.setTimestamp()
		.setFooter(`*More work to be done AWW MAN !!*`);
	for(var i=0;i<commandName.length;i++) {
		if(!syntx[i] && desc[i])
			panelCmds.addField('`'+`${commandName[i]}`+'`',desc[i]);
		else if (syntx[i].includes('<'))
			panelCmds.addField('`'+`${commandName[i]}`+`${syntx[i]}`+'`',desc[i]);
		else 
			panelCmds.addField('`'+`${commandName[i]}`+'`'+`${syntx[i]}`,desc[i]);
		}
	return message.channel.send(panelCmds);
	}
	catch(error){
		console.log(error)};
}};