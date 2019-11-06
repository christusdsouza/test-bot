//import date-and-time
// Load up the discord.js library discord.js 11.5.1
const Discord = require("discord.js");
const config = require("./config.json");  // Here we load the config.json file that contains our token and our prefix values. 
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
const os = require("os");
console.log(Discord.version);
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let BOTchan = client.channels.get(`569190661081923612`);
  let dUser = client.users.get(`295483659274944512`);
  dUser.send("<@295483659274944512>");
  BOTchan.send("<@295483659274944512>");
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  //if(message.author.bot) return;
  //message.react('637727531709104136');
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  //if(message.content.indexOf(config.prefix) !== 0) return;
   var c = message.channel.name;
  var user = message.author.username;
  var date = "["+d.format(new Date(), 'DD/MM/YYYY HH:mm:ss')+'] @'+c+' '+user+' : ';
  fs.appendFileSync("log.txt",os.EOL+date+message.content);
   // if(message.edit) {
		// fs.appendFileSync("log.txt",os.EOL+"[***EDITED***] "+message.edit);
  // }
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  if(message.content.indexOf(config.prefix)  != 0) return;
  
  // Let's go with a few common example commands! Feel free to delete or change those.
 
  try {
		if (client.commands.has(command)) {
		client.commands.get(command).execute(message, args,client); }
		
		if(client.alias.has(command)) {
			console.log(command);
			client.alias.get(command).execute(message, args,client); }
	} catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command! OR This command doesnt exist.');
} 
});
client.on("error", err => {
	console.log(err); });
client.login(process.env.token);
