let fs  = require('fs');
const d = require("date-and-time");
const os = require("os");
module.exports = {
	execute(message,client,BOTchan,d) {
		const redd1 = client.channels.get(`612331585622114304`);
		const redd2  =  client.channels.get(`612345860373741578`);
		const redd3  = client.channels.get(`625695412602273792`);
		if(BOTchan !=  message.channel.name && !message.author.bot || (message.channel in (redd1, redd2, redd3))) {
			var user = message.author.username;
			var date = "["+d.format(new Date(), 'DD/MM/YYYY HH:mm:ss')+'] @'+message.channel.name+' '+user+' : ';
			fs.appendFileSync("./log.txt",os.EOL+date+message.content);
		}
}};
