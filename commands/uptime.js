module.exports = {
	description: "uptime",
	execute(message,args,client) {
		return message.channel.send(
			'Status: '+client.status+
			'Uptime: '+(client.uptime/3600000)
			);
}};