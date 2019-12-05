module.exports = {
	description: "Shh, Nothing to look here really...",
	execute(message,client,args) {
		var val = message.author.hasPermission(`Administrator`);
		console.log(val);
		return message.channel.send(val);
}};