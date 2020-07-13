module.exports = {
	description: "Bot uptime",
	execute(message,args,client) {
		return message.channel.send(
			'Status: '+client.ws.status+
			'\nUptime: '+milliConvert(client.uptime)
		);
}};
function milliConvert(milliseconds) {
	const seconds = ((milliseconds / 1000) % 60);
	const minutes = ((milliseconds / (1000*60)) % 60);
	const hours   = (milliseconds / (1000*60*60));
	const days = (hours / 24);
	if (days < 1) return hours.toFixed(0)+':'+minutes.toFixed(0)+':'+seconds.toFixed(0);
	return days.toFixed(0)+'d '+(hours.toFixed(0)%24)+'h '+minutes.toFixed(0)+'m '+seconds.toFixed(0)+'s';
}
