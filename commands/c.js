module.exports= {
	description: "Call this to clean up bot clutter",
	async execute(message) {
		message.delete();
		const fetched = await message.channel.fetchMessages();
		console.log(fetched.filter(auth => auth.attachments.first()));
		message.channel.bulkDelete(fetched.filter(auth => auth.author.bot === true || auth.attachments.first()))
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`)); 
}};