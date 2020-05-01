const Discord = require(`discord.js`);
module.exports = {
    syntax: "<user> <reason>",
    description: "Drop that Ban Hammer already !\nNuke the faggot *No reasons needed*",
    alias: ['nuke'],
    perms: "ADMINISTRATOR",
    async execute(message, args) {
        // Most of this command is identical to kick, except that here we'll only let admins do it.
        // In the real world mods could ban too, but this is just an example, right? ;)
        if (!message.member.hasPermission(`ADMINISTRATOR`))
            return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete(10000));
        if (!args.length)
            return message.reply("PPSYCH didnt mention hammer-drop victim...").then(msg => msg.delete(10000));

        let member = message.mentions.members.first() || message.guild.members.find((member) => {
            if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
            else if (member.user.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
            else if (member.user.id === args[0]) return true;
            else if (member.user.discriminator === args[0]) return true;
            else return false;
        });
        if (!member) return message.reply("Please mention a valid member of this server").then(msg => msg.delete(10000));
        if (!member.bannable) return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?").then(msg => msg.delete(10000));

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`).then(msg => msg.delete(10000)));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} for reason: ${reason}`);
    }
};