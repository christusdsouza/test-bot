module.exports = {
	alias: "stag",
	syntax: " <user> <amount>",
	description: "Annoy that faggot with mass pings\n[Limit:100]",
	async execute(message,args,client) {
		try{
	let chan = client.channels.find(chan => chan.name === 'bot-mug');
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	//c.writeFileSync("info.txt",member);//message.mentions.members.first());// message.guild.members.get(args[0]));
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