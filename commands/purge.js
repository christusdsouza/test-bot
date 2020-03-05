module.exports = {
	alias: 'clean',
	syntax: " <amount>",
	description: "Get rid off some messages(Limit:100)",
	async execute(message, args) {
		// This command removes all messages from all users in the channel, up to 100.
    if(!message.member.hasPermission(`MANAGE_MESSAGES`))
		return message.reply("Sorry, you don't have permissions to use this!");
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
	message.delete();
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 0 || deleteCount > 1000)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`)); 
	}
};
