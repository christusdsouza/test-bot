//Every Command has a Description, Syntax is an exception
const MessageEmbed = require("discord.js").MessageEmbed;

/**
 * To Create Syntax and Description Array
 * @param {Collection} commands Collection<Map>[k,v]: JSON Obj of all commands(meta-info)
 * @param {Array} commandName 
 * @param {Boolean} flagSyntax  true:getSyntax; false:getDescription 
 */
function getstuff(commands, commandName, flagSyntax = true) { 		
	let stuff = [];
	for (let i = 0; i < commandName.length; i++) {
		if (flagSyntax) stuff.push(commands.get(commandName[i]).syntax);
		else stuff.push(commands.get(commandName[i]).description);
	}
	return stuff;
};

module.exports = {
	alias: "help",
	description: "Get a list of commands",
	/***
	 * @params {Collection} message
	 * @params {Array} args; args[0]: String command
	 * @params {this.Client} client; {Collection} commands, {Collection} alias
	 **/
	async execute(message, args, client) {
		try {
			const [commandName, syntax, description] = [client.commands.find((name) => {name.alias ? name.alias.includes(args[0]) : false}) || args[0] || Array.from(client.commands.keys()),getstuff(client.commands, commandName, true), getstuff(client.commands, commandName, false)];
			
			if (args.length == 1 && client.commands.has(commandName))		//Single Command Check 
				return commandHelp(message, args, client, panelCmds);
			
			const panelCmds = new MessageEmbed()
				.setColor('0x' + "0080FF")
				.setTitle('WWV Bot Command list')
				.setThumbnail(message.guild.iconURL())
				.setDescription('Server -prefix `' + '`' + '`~no modification to prefixes due to sever issues~\nFormat:`commandName w/syntax` Info & Description')
				.setFooter(`*More work to be done AWW MAN !!*`);

			for (let i = 0; i < commandName.length; i++) {
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
	const commandName = client.commands.find((name) => { name.alias ? name.alias.includes(args[0]) || name.alias == args[0] : false; }) || args[0];
	const syntax = client.commands.get(commandName).syntax || "";
	const description = client.commands.get(commandName).description;
	const alias = client.commands.get(commandName).alias || null;
	const perms = client.commands.get(commandName).perms;
	const cooldown = client.commands.get(commandName).cooldown;
	panelCmds
		.setColor('0x' + "0080FF")
		.setTitle(commandName)
		.addField("Syntax:", "```" + commandName + ' ' + syntax + "```");
	if (alias) {
		if (alias.constructor === String)  panelCmds.addField("Alias:", alias);
		else if (alias instanceof Array && alias.length)  panelCmds.addField("Alias:", alias.join(', '));
	}
	panelCmds.addField("Description", description);
	if (cooldown)  panelCmds.addField("Cooldown:", cooldown);
	if (perms)  panelCmds.addField("Required Permissions:", perms);

	message.channel.send(panelCmds);
}