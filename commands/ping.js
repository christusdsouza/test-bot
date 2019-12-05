module.exports = {
	syntax: " NONE, For Real",
	description: "Just to make sure if I'm up to play ping-pong with ya",
	async execute(message,args,client) {
	//Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
		const m = await message.channel.send("Ping?");
		m.edit(`Lond! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	
	}
};
