module.exports = {
	syntax: " <user> <message>",
	description: "For the weak hearted, speak it out in anonmity",
	async execute(message,args,client) {
	let dUser = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]); //`295483659274944512`;  
	//let dUser = `311761674241835009`;
	message.channel.send("Nuking the PING engine");
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(args[0])
	{
		if(member)
		{
			if(!isNaN(args[1]) && args[1] <= 100)
			{
				for(var i = 0; i < args[1]; i++)
				{
					//if(!isNaN)
						dUser.send(args[0]);
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