//Every Command has a Description, Syntax is an exception
const Discord = require("discord.js");

function getstuff(commands, commandName, flag = true) { 				//Map.Commands, Array.commandName, Boolean.flag= true:getSyntax, false:getDescription 
	var stuff = [];
	for (let i = 0; i < commandName.length; i++) {
		if (flag)
			stuff.push(commands.get(commandName[i]).syntax);
		else
			stuff.push(commands.get(commandName[i]).description);
	}
	return stuff;
};

module.exports = {
	alias: "help",
	description: "Get a list of commands",
	async execute(message, args, client) {
		try {
			const panelCmds = new Discord.RichEmbed();
			const commandName = client.commands.findKey(name => name.alias ? name.alias.includes(args[0]) : false) || args[0] || Array.from(client.commands.keys());

			if (args.length == 1 && client.commands.has(commandName))		//Specific Command Check 
				return commandHelp(message, args, client, panelCmds);

			const syntax = getstuff(client.commands, commandName, true);
			const description = getstuff(client.commands, commandName, false);

			panelCmds
				.setColor('0x' + "0080FF")
				.setTitle('WWV Bot Command list')
				.setThumbnail(message.guild.iconURL)
				.setDescription('Server -prefix `' + '`' + '`~no modification to prefixes due to sever issues~\nFormat:`commandName w/syntax` Info & Description')
				.setTimestamp()
				.setFooter(`*More work to be done AWW MAN !!*`);
			for (let i = 0; i < commandName.length; i++) {
				console.log(syntax[i] + ' ' + Boolean(syntax[i]));
				if (syntax[i])
					panelCmds.addField('`' + `${commandName[i]}` + '` ' + `${syntax[i]}`, description[i]);
				else
					panelCmds.addField('`' + `${commandName[i]}` + '`', description[i]);
			}
			return message.channel.send(panelCmds);
		}
		catch (error) {
			console.log(error)
		};
	}
};

function commandHelp(message, args, client, panelCmds) {
	var commandName = client.commands.findKey(name => name.alias ? name.alias.includes(args[0]) || name.alias == args[0] : false) || args[0];
	var syntax = client.commands.get(commandName).syntax || "";
	var description = client.commands.get(commandName).description;
	var alias = client.commands.get(commandName).alias || null;
	var perms = client.commands.get(commandName).perms;
	var cooldown = client.commands.get(commandName).cooldown;
	panelCmds
		.setColor('0x' + "0080FF")
		.setTitle(commandName)															//COMMAND_NAME
		.addField("Syntax:", "```" + commandName + ' ' + syntax + "```");				//SYNTAX - exceptional in many cmds instead may have COMMAND_NAME
	if (alias) {
		if (alias.constructor === String) panelCmds.addField("Alias:", alias); 			//ALIASes
		else if (alias instanceof Array && alias.length) panelCmds.addField("Alias:", alias.join(', '));
	}
	panelCmds.addField("Description", description);										//DESCRIPTION - made compulsory in all commands
	if (cooldown) panelCmds.addField("Cooldown:", cooldown);							//COOLDOWN 
	if (perms) panelCmds.addField("Required Permissions:", perms);						//PERMS - for server administrative and critical cmds

	message.channel.send(panelCmds);
}