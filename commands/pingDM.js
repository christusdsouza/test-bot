module.exports = {
	syntax: " <user> <message>",
	description: "For the weak hearted, speak it out in anonmity",
	async execute(message,args,client) {
		try{
	let dUser = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]); 
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(args[0])
	{
		if(member)
		{
			var text = args.slice(1).join(' ');
			dUser.send(text).then(message.delete(6000));
			message.reply("*wink wink* your whisper has travelled overseas successfully").then(msg => msg.delete(5000));
		}
		else{
			return message.channel.send(`FFS who is this mf youre trying to ping man !`);
		}
	}
	else return;
}
catch(error){
		console.log(error)};
}};