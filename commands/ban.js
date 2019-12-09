const Discord = require(`discord.js`);
module.exports = {
	syntax: " <user> <reason>",
	description: "Drop that Ban Hammer already !\nNuke the faggot *No reasons needed*",
	async execute(message,args) {
	var flag = new Discord.Permission(message.author,`ADMINISTRATOR`);
	// Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!flag.has(`ADMINISTRATOR`))
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
}};