const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const config = require("./config.json");  // Here we load the config.json file that contains our token and our prefix values. 
const log = require('./logger.js');
const http = require("http");
const axios = require("axios");
const port = process.env.PORT || 3000;
http.createServer().listen(port);

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
client.commands = new Discord.Collection();
client.alias = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file in commandFiles) {
    const command = require(`./commands/${file}`);
    let commandName = file.split(".").shift().toLowerCase();
    if (command.alias) 
        client.alias.set(command.alias.toString(), command);
    client.commands.set(commandName, command);
}

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setPresence({
        activity: {
            name: 'WWV v Tyrants',type: 'STREAMING',url: `https://www.youtube.com/watch?v=q0TjIl7BCE0`,
        },
        status: 'online',
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
    message.attachments.each(key => axios(key.url));
    // This event will run on every single message received, from any channel or DM.
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/[\s]+/g);
    const command = args.shift().toLowerCase();
    //log.execute(message, client, BOTchan);
    if (command === "snipe") {
        if (prevMessage) return message.channel.send(prevMessage.get(message.channel.id).content);
        else return message.channel.send("Nothing to see here...");
    }
    if (message.author.id == `270904126974590976`) {
        if (message.content.search("Reverse") + 1) {
            var str = message.content.substring(message.content.search('`') + 1, message.content.length - 1);
            return message.channel.send(str.split('').reverse().join(''));
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
            message.reply(' Oops Boomer, this command doesnt exist.\n`/cmds` -- for commmand info').then(msg => msg.delete({timeout:5000}));
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to execute that command!').then(msg => msg.delete({timeout:5000}));
    }
});
client.on("messageReactionAdd", async (reaction, user) => {
    // Regex search to find channel#: log(s)
    //let chan = message.guild.channels.cache.find(chan => Boolean(chan.name[chan.name.search(/-(log|logs)$\b/gi)]));
    let chan = client.channels.cache.find(chan => chan.id === `569192598313500683`); 
    const embed = new Discord.MessageEmbed()
        .setColor(randColor())
        .setAuthor(`${user.tag} (${user.id})`, user.avatarURL)
        .setThumbnail(reaction.emoji.url)
        .setTimestamp()
        .setFooter('', newMember.guild.iconURL())
        .setDescription(
            `**Reason:** A reaction was added\n` +
            `**Channel:** #${reaction.message.channel.name} (${reaction.message.channel.id})\n` +
            `**Message:** (${reaction.message.id})\n` +
            `**Emoji:** ${reaction.emoji.name} (${reaction.emoji.id})\n` +
            `**Message Link:** https://discordapp.com/channels/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`
        );
    chan.send(embed);
});

let prevMessage = new Discord.Collection();
client.on("messageDelete", async (message) => {
    prevMessage.set(message.channel.id, message);
    if (!message.attachments.size) return;
    let [imgList, chan] = [[], message.guild.channels.cache.find(chan => chan.id === '661036691229769728')];
    message.attachments.each(key => {
        imgList.push(key.url);
    });
    chan.send({ files: imgList });
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (((oldMessage.content.search("Work") + 1) || (oldMessage.content.search("Color") + 1)) && oldMessage.author.id == `270904126974590976` && !oldMessage.content) {
            newMessage.channel.send(oldMessage.content);
    } else return;
});

client.on("emojiDelete", async (emoji) => {
    //var audits = new GuildAction
    const chan = emoji.guild.channels.cache.find(chan => chan.id === `569192598313500683`);
    chan.send('Emoji Deleted: ' + emoji + '\nLINK: ' + emoji.url);
	/*const embed = new Discord.MessageEmbed()
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
    try {
        const [member, chan, oldClientStatus, newClientStatus] = [(oldMember || newMember), (member.guild.channels.cache.find(chan => chan.name === 'presence')), (JSON.stringify(oldMember.clientStatus)).match(/[^{"}]+/g), (JSON.stringify(newMember.clientStatus)).match(/[^{"}]+/g)];
        let oldActivity, newActivity, stringy;
        if (oldMember.activities) {
            stringy = JSON.stringify(oldMember.activities[0], replacer(oldMember.activities[0]));
            oldActivity = stringy.match(/[^{"}]+/g).join(' ');
        } else { oldActivityName = 'Nothing', oldActivityType = 'Doing' }
        if (newMember.activities) {
            stringy = JSON.stringify(newMember.activities[0], replacer(newMember.activities[0]));
            newActivity = stringy.match(/[^{"}]+/g).join(' ');
        } else { newActivityName = 'Nothing', newActivityType = 'Doing' }

        const Embed = await new Discord.MessageEmbed()
            .setTitle('User Activity')
            .setColor(randColor())
            .setThumbnail(newMember.user.avatarURL)
            .setDescription(newMember.user.username)
            .addField('Previous Activity',
                '\nPlatform: ' + oldClientStatus.join(' ') +
                '\n' + oldActivity +
                '\nStatus: ' + oldMember.status
            )
            .addField(
                'Current Activity',
                '\nPlatform: ' + newClientStatus.join(' ') +
                '\n' + newActivity +
                '\nStatus: ' + newMember.status
            )
            .setThumbnail(newMember.user.avatarURL())
            .setFooter('', newMember.guild.iconURL())
            .setTimestamp();
        chan.send(Embed);
    } catch (e) { }
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
});
function randColor() {
    let colorx = "";
    const letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++)  colorx += letters[Math.floor(Math.random() * letters.length)];
    return ("0x" + colorx);
}
function replacer(obj) {
    let whitelist = [];
    for (var key in obj) {
        // Filtering out properties
        if (typeof obj[key] != 'object' && obj[key] != null && isNaN(obj[key]) && key != 'syncID') whitelist.push(key);
    }
    return whitelist;
}
client.on("error", err => {
    console.log(err.getMessage());
});
client.login(process.env.token);