//import date-and-time
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
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let BOTchan = client.channels.get(`${process.env.erch}`);
  let dUser = client.users.get(`${process.env.er}`);
  dUser.send('<@'+`${process.env.er}`+'>');
  dUser.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');
  BOTchan.send('<@'+`${process.env.er}`+'>');  
log.execute(message,client,BOTchan);
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  // if(message.author.bot) return;
  // message.react('637727531709104136');
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
   // if(message.edit) {
		// fs.appendFileSync("log.txt",os.EOL+"[***EDITED***] "+message.edit);
  // }
  try {
		if (client.commands.has(command)) {
		client.commands.get(command).execute(message, args,client,client.commands); }
		
		if(client.alias.has(command)) {
			client.alias.get(command).execute(message, args,client,client.commands); }
		if(!client.alias.has(command))
			message.channel.send('Oops Boomer, this command doesnt exist.\n`/cmds` -- for commmand info');
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!');
} 
});
client.on('messageReactionAdd', async (reaction, user) => {
	let BOTchan = client.channels.find(chan => chan.name ===`server-logs`);
	var colorx = "";
	var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) 
       colorx += letters[(Math.floor(Math.random() * 16))]; 
    const embed= new Discord.RichEmbed()
        .setColor('0x'+colorx)
        .setAuthor(`${user.tag} (${user.id})`, user.avatarURL)
        .setThumbnail(reaction.message.guild.iconURL)
        .setDescription(`**Reason:** A reaction was added\n`
			+ `**Channel:** #${reaction.message.channel.name} (${reaction.message.channel.id})\n`
            + `**Message:** (${reaction.message.id})\n`
            + `**Emoji:** ${reaction.emoji.name} (${reaction.emoji.id})\n`
            + `**Message Link:** https://discordapp.com/channels/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`)
			.setImage(reaction.emoji.url)
        .setTimestamp();
		
	BOTchan.send(embed);
    });
client.on("error", err => {
	console.log(err.getMessage()); });
client.login(process.env.token);
