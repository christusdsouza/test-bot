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
	var days = hours / 24;
	if (days.toFixed(0) < 1) return hours.toFixed(0)+':'+minutes.toFixed(0)+':'+seconds.toFixed(0);
	return days.toFixed(0)+'d '+hours.toFixed(0)+'h '+minutes.toFixed(0)+'m '+seconds.toFixed(0)+'s';
}
