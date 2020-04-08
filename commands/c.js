const params = ['file','files','attch','attachments'];
module.exports= {
	description: "Call this to clean up bot clutter",
	alias: 'cls', 
	async execute(message,args) {
	try{
		message.delete();
		const fetched = await message.channel.fetchMessages();
		
		if(args.length) if(params.includes(args[0])) return message.channel.bulkDelete(fetched.filter(auth => auth.attachments.first()),true);
		else if(args.length) if(args[0] == 'bot') return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true));
		else return message.channel.bulkDelete(fetched.filter(auth => auth.author.bot == true || auth.attachments.first()),true);
	} catch(error) { message.reply(`Couldn't delete messages because of: ${error}`); } 
}};