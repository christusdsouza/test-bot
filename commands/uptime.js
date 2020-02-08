module.exports = {
	description: "uptime",
	execute(message,args,client) {
		return message.channel.send(
			'Status: '+client.status+
			'\nUptime: '+uptime(client.uptime)
			);
}};
function uptime(milliseconds) {
	var seconds = ((milliseconds / 1000) % 60);
	var minutes = ((milliseconds / (1000*60)) % 60);
	var hours   = ((milliseconds / (1000*60*60)) % 24);
	return hours.toFixed(0)+':'+minutes.toFixed(0)+':'+seconds.toFixed(0);
}