const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const config = require("./config.json");  // Here we load the config.json file that contains our token and our prefix values. 
const log = require('./logger.js');
const http = require("http");
const port = process.env.PORT || 3000;
http.createServer().listen(port);

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
client.commands = new Discord.Collection();
client.alias = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const com = require(`./commands/${file}`);
    let commandName = file.split(".").shift().toLowerCase();
    if (com.alias) {
        var alias = com.alias.toString();
        client.alias.set(alias, com);
    }
    client.commands.set(commandName, com);
}

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setPresence({
      activity: {
        name: "WWV v Tyrants",
        type: "STREAMING",
        url: `https://youtu.be/q0TjIl7BCE0`,
        application: {
          id: "631776475858599936",
        },
      },
      status: "online",
    });
    client.channels.cache.find(chan => chan.id === `647162352797745172`).send('OOps, We good now; Back in Action');
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});
console.log(new Date());
console.log(Discord.version);

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const prefix = message.content.slice(0, 1);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    //log.execute(message, client, BOTchan);
    if (command === "snipe") {
      if (prevMessage) return message.channel.send(prevMessage.content);
      else return message.channel.send("Nothing to see here...");
    }
    if (message.author.id == `270904126974590976`) {
        if (message.content.search("Reverse") + 1) {
            var str = message.content.substring(message.content.search('`') + 1, message.content.length - 1);
            return message.channel.send(reverseString(str));
        }
    }
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    // Also good practice to ignore any message that does not start with our prefix, 
    // which is set in the configuration file.
    if (config.prefix != prefix) return;
    try {
        if (client.commands.has(command))
            client.commands.get(command).execute(message, args, client);
        else if (client.alias.has(command)) 
            client.alias.get(command).execute(message, args, client);
        else
            message.reply(' Oops Boomer, this command doesnt exist.\n`/cmds` -- for commmand info')
                .then(msg => msg.delete(5000));
        } catch (error) {
            console.error(error);
        message.channel.send('There was an error trying to execute that command!'
        ).then(msg => msg.delete(5000));
        }
    });
client.on("messageReactionAdd", async (reaction, user) => {
    let BOTchan = client.channels.cache.find(chan => chan.name === `dyno-logs`);
    var colorx = randColor();
    var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++)  colorx += letters[Math.floor(Math.random() * 16)];
    const embed = new Discord.RichEmbed()
        .setColor()
        .setAuthor(`${user.tag} (${user.id})`, user.avatarURL)
        .setThumbnail(reaction.message.guild.iconURL)
        .setDescription(
            `**Reason:** A reaction was added\n` +
            `**Channel:** #${reaction.message.channel.name} (${reaction.message.channel.id})\n` +
            `**Message:** (${reaction.message.id})\n` +
            `**Emoji:** ${reaction.emoji.name} (${reaction.emoji.id})\n` +
            `**Message Link:** https://discordapp.com/channels/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`
        )
        .addField(reaction.emoji.url)
        .setTimestamp();
    BOTchan.send(embed);
});
let prevMessage = undefined;
client.on("messageDelete", async(message) => {
    prevMessage = message;
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
    if ((oldMessage.content.search("Work") + 1) || (oldMessage.content.search("Color") + 1)) {
        if (oldMessage.author.id == `270904126974590976`) {
            if (!oldMessage.content)  return;
            newMessage.channel.send(oldMessage.content);
        }
    } else return;
});
client.on("emojiDelete", async (emoji) => {
    //var audits = new GuildAction
    var colorx = randColor();
    var chan = emoji.guild.channels.cache.find(chan => chan.id === `569192598313500683`);
    chan.send('Emoji Deleted: ' + emoji + '\nLINK: ' + emoji.url);
	/*const embed = new Discord.RichEmbed()
		.setColor("0x" + colorx)
		.setThumbnail(emoji.guild.iconURL)
		.setDescription(
		`**Event:** Emote Deleted\n` +
        `**Deleted by:** ${emoji.user_id}\n`
		)
		.addField(
		`**Author:** ${emoji.author}\n` +
        `**Time of Creation:** ${emoji.createdAt}`
		)
		.setImage(emoji.url)
		.setTimestamp()
		.setFooter('Deleted, RIP',emoji.user_id.avatarURL);
  chan.send(embed);*/
});
client.on("presenceUpdate", async (oldMember, newMember) => {
    var member = oldMember || newMember;  //nikal lavde --no running twice
    var chan = member.guild.channels.cache.find(chan => chan.name === 'presence') || ;
    var oldClientStatus = (JSON.stringify(oldMember.clientStatus)).match(/[^{"}]+/g);
    var newClientStatus = (JSON.stringify(newMember.clientStatus)).match(/[^{"}]+/g);
    var oldActivityName, oldActivityType, newActivityName, newActivityType;

    if(oldMember.activity) {
        oldActivityName = oldMember.activity.name;
        oldActivityType = oldMember.activity.type;
    } else { oldActivityName = 'Nothing', oldActivityType = 'Doing' }
    if(newMember.activity) {
        newActivityName = newMember.activity.name;
        newActivityType = newMember.activity.type;
    } else { newActivityName = 'Nothing', newActivityType = 'Doing' }
  
    const Embed = await new Discord.MessageEmbed()
        .setTitle('User Activity')
        .setColor(randColor())
        .setThumbnail(newMember.user.avatarURL)
        .setDescription(newMember.user.username)
        .addField('Previous Activity',
            '\nPlatform: ' + oldClientStatus.join(' ') + 
            '\n' + oldActivityType + ' ' + oldActivityName+
            '\nStatus: ' + oldMember.status
        )
        .addField(
            'Current Activity',
            '\nPlatform: ' + newClientStatus.join(' ') +
            '\n' + newActivityType + ' ' + newActivityName +
            '\nStatus: ' + newMember.status
        )
        .setThumbnail(newMember.user.avatarURL())
        .setFooter('', newMember.guild.iconURL())
        .setTimestamp();

    /* Condition to check if a 'user' is in a !offline state and also track the total time spent in a !offline state till 'user':offline
    if (P.status === `dnd` || P.status === `online` || P.status === `idle`)
      {
      if(!mem.has(P.userID))	mem.set(P.userID,dTime);        //Single branch if-cond. to check if the 'user' has been in a !offline state && is present in Map.mem       
          Embed.setFooter('Presence Recorded at '+milliConv(dTime)+'\n@Collection.mem '+mem.get(P.userID));                //test-message in Embed.footer field, can be edited as desired
      } else {
      //-> Code for sending the total amount of time spent on one Presence State for a particular 'user'   
          var diff = dTime - mem.get(P.userID);       //Total time spent on one Presence State
          Embed.setFooter('Presence Noted and terminated at '+millConv(diff)+'\nVal in Collection.mem '+mem.get(P.userID)); //test-message in Embed.footer field, can be edited as desired
      mem.delete(P.userID);                       //Pop the 'user' from Map.mem for the previous state
    }*/
    chan.send(Embed);
});
function randColor() {
    var colorx = "";
    var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++)  colorx += letters[Math.floor(Math.random() * 16)];
    return ("0x" + colorx);
}
function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--)  newString += str[i];
    return newString;
}
client.on("error", err => {
    console.log(err.getMessage());
});
client.login(process.env.token);