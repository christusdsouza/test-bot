let prevPingCmd;
module.exports = {
	alias: "stag",
	syntax: " <user> <amount>",
	description: "Annoy that faggot with mass pings\n[Limit:100]",
	async execute(message,args,client) {
		try{
	let chan = client.channels.find(chan => chan.name === 'bot-mug');
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	
	//Timeout set to 10 minutes(600000 ms) from the last sent command
	if(!prevPingCmd)
		prevPingCmd = message.createdTimestamp;
	else
		var now = message.createdTimestamp;
	console.log('\nprev'+prevPingCmd+'\nnow'+now);
	if(now - prevPingCmd < 600000) return message.reply('Scoot away dumb bitch I got some mentions to do');
	
	//Ping starts here
	if(args[0])
	{
		if(member)
		{
			if(!isNaN(args[1]) && args[1] <= 100)
			{
				message.channel.send("Nuking the PING engine");
				for(var i = 0; i < args[1]; i++)
				{
					chan.send(args[0]);
				}
				return message.channel.send("DONE FFS");
			}
			else{
				return message.channel.send(`Please tell me how many times to ping that faggot and remember mention limit is set to **100** FFS!!`);
			}
		}
		else{
			return message.channel.send(`FFS who is this mf youre trying to ping man !`);
		}
	}
	else return;
}catch(error){
	console.log(error)
}
}};