module.exports = {
	description: "Just to make sure if I'm up to play ping-pong with ya [Server/API Latency]",
	async execute(message,args,client) {
	// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
		const msg = await message.channel.send("Ping?")
			.catch(O_o => { });
		msg.edit(`Lond! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
};
