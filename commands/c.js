module.exports= {
	description: "Call this to clean up bot clutter",
	async execute(message) {
		const fetched = await message.channel.fetchMessages();
		message.channel.bulkDelete(fetched.filter(auth => auth.author.bot === true))
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`)); 
		message.delete(10);
}};