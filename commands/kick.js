const Discord = require(`discord.js`);
module.exports = {
    syntax: "<user> <reason>",
    description: "Pest Control? We got ya a bug spray, KICK EM OUT for Good.",
    /**
     * 
     * @param {Collection} message 
     * @param {Array} args: [0]: member/GuildMember, [1]: 'reason'
     */
    async execute(message, args) {
        //This command must be limited to mods and admins. THIS IS A BAD IDEA to -> hardcode the role names <- THIS IS A BAD IDEA
        if (!message.member.hasPermission(`KICK_MEMBERS`))
            return message.reply("Sorry, you don't have permissions to use this!").then(msg => msg.delete(10000));
        // Let's first check if we have a member and if we can kick them!
        // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
        // We can also support getting the member by ID, which would be args[0]
        if (!args.length) return message.reply("Looks like you forgot the one who you wanted to kick in the balls").then(msg => msg.delete(10000));
        
        let member = message.mentions.members.first() || message.guild.members.cache.find((member) => {
            if (member.user.username.toUpperCase() === args[0].toUpperCase()) return true;
            else if (member.nickname != null && member.nickname.toUpperCase() === args[0].toUpperCase()) return true;
            else if (member.user.id === args[0]) return true;
            else if (member.user.discriminator === args[0]) return true;
            else return false;
        });
        if (!member) return message.reply("Please mention a valid member of this server").then(msg => msg.delete(10000));
        if (!member.kickable) return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?").then(msg => msg.delete(10000));

        // slice(1) removes the first part, which here should be the user mention or ID
        // join(' ') takes all the various parts to make it a single string.
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        // Now, time for a swift kick in the nuts!
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`).then(msg => msg.delete(10000)));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} for reason: ${reason}`);
    }
};