// Load up the discord.js library discord.js 11.5.1
const Discord = require("discord.js");
const config = require("./config.json");  // Here we load the config.json file that contains our token and our prefix values. 
const log = require('./logger.js');
require("dotenv/config");
const http = require("http");
const port = process.env.PORT || 3000;
http.createServer().listen(port);
const client = new Discord.Client();
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const fs = require('fs');
client.commands = new Discord.Collection();
client.alias = new Discord.Collection();
const mem = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const d = require("date-and-time");
console.log(d.format(new Date(), 'DD/MM/YYYY HH:mm:ss'));

for (const file of commandFiles) {
	const com = require(`./commands/${file}`);
	let commandName = file.split(".").shift().toLowerCase();
	if(com.alias) {
		var alias = com.alias.toString(); 	
		client.alias.set(alias, com); }
	client.commands.set(commandName, com);
}
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
client.user.setActivity(`Tyranny NUKE Humanity`,{type: `Watching`});
client.channels.find(chan => chan.name == `bot-mug`).send('OOps, We good now; Back in Action');
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
console.log(Discord.version);
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  let perms = new Discord.Permissions(message.author,[`ADMINISTRATOR`,`MANAGE_MESSAGES`]);
  const prefix = message.content.slice(0,1);
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let BOTchan = client.channels.get(`${process.env.erch}`);
  let dUser = client.users.get(`${process.env.er}`);
  dUser.send('<@'+`${process.env.er}`+'>');
  dUser.send('<@'+`${process.env.er}`+'>');
  dUser.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');  
log.execute(message,client,BOTchan);
if(message.author.id == `270904126974590976`)  {
	  if(message.content.search("Reverse") + 1) {
		  var str = message.content.substring(message.content.search('`')+1,message.content.length-1); 
		  return message.channel.send(reverseString(str));
	  }
  }
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  // if(message.author.bot) return;
  // message.react('637727531709104136');
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(config.prefix != prefix) return;
  
   // if(message.edit) {
		// fs.appendFileSync("log.txt",os.EOL+"[***EDITED***] "+message.edit);
  // }
  try {
		if (client.commands.has(command)) {
		    client.commands.get(command).execute(message,args,client); }//admPerms,modPerms);  
		else if(client.alias.has(command)) { 
			client.alias.get(command).execute(message,args,client); }//admPerms,modPerms); 
		else {
			message.reply(' Oops Boomer, this command doesnt exist.\n`/cmds` -- for commmand info'); }
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
  }
});
client.on("messageReactionAdd", async (reaction, user) => {
  let BOTchan = client.channels.find(chan => chan.name === `dyno-logs`);
  var colorx = randColor();
  var letters = "0123456789ABCDEF";
  for (var i = 0; i < 6; i++) colorx += letters[Math.floor(Math.random() * 16)];
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
client.on("messageUpdate",async(oldMessage,newMessage)=> {
	if((oldMessage.content.search("Work") + 1) || (oldMessage.content.search("Color") + 1)) {
	if(oldMessage.author.id==`270904126974590976`) {
		if(!oldMessage.content) return;
		newMessage.channel.send(oldMessage.content); }
	} else return;
});
client.on("emojiDelete",async(emoji) => {
	//var audits = new GuildAction
	var colorx = randColor();
	var chan = emoji.guild.channels.find(chan => chan.name == 'dyno-logs');
	chan.send('Emoji Deleted: '+emoji+'\nLINK: '+emoji.url);
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
client.on("presenceUpdate", async(oldMember, newMember) => {
  var dTime= Date.now();
	var P = new Discord.Presence(newMember.presence, newMember.clientStatus);
	var chan = oldMember.guild.channels.find(chan => chan.name == 'presence');
	const Embed = await new Discord.RichEmbed()
	  .setTitle('User Activity')
	  .setColor(randColor())
	  .setDescription('User: '+newMember.displayName+'\nActivity: '+P.status+' || Status: '+P.game)
	  .setTimestamp();

	if (P.status === `dnd` || P.status === `online` || P.status === `idle`)
	{
    if(!mem.has(P.userID))	mem.set(P.userID,dTime);
		Embed.setFooter('Presence Recorded at '+uptime(dTime)+'\n@Collection.mem '+mem.get(P.userID));
		chan.send(Embed);
	} else {
		var diff = dTime - mem.get(P.userID);
		Embed.setFooter('Presence Noted and terminated at '+uptime(diff)+'\nVal in Collection.mem '+mem.get(P.userID));
		mem.delete(P.userID);
		chan.send(Embed);
	}
});
function uptime(milliseconds) {
	var seconds = ((milliseconds / 1000) % 60);
	var minutes = ((milliseconds / (1000*60)) % 60);
	var hours   = (milliseconds / (1000*60*60));
	var days = (hours / 24);
	if (days < 1) return hours.toFixed(0)+'h'+minutes.toFixed(0)+'m'+seconds.toFixed(0)+'s';
	return days.toFixed(0)+'d '+(hours.toFixed(0)%24)+'h '+minutes.toFixed(0)+'m '+seconds.toFixed(0)+'s';
}
function randColor() {
  var colorx = "";
  var letters = "0123456789ABCDEF";
  for (var i = 0; i < 6; i++) colorx += letters[Math.floor(Math.random() * 16)];
  return ("0x"+colorx);
}
function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--)
        newString += str[i];
    return newString;
}
client.on("error", err => {
	console.log(err.getMessage()); 
});
client.login(process.env.token);
