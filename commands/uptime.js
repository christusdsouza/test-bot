module.exports = {
	description: "Critical: Invite creation, only for Admins/Owner",
	execute(message,args,client) {
		return message.channel.send(
			'Status: '+client.status+
			'Uptime: '+(client.uptime/3600000)
			);
}};