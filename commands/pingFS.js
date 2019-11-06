module.exports = {
	execute(message,args,client) {
	message.channel.send("Nuking the PING engine");
	let chan = client.channels.get(`569190661081923612`);
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(args[0])
	{
		if(member)
		{
			if(!isNaN(args[1]) && args[1] <= 100)
			{
				
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
}};