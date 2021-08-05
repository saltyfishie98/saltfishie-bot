module.exports = {
	commands: ["ping"],
	shortDesc: "Ping hosting server for respond",
	maxArgs: 0,
	callback: (message, args, text) => {
		message.channel.send("calculating...").then(
			result => {
				const ping = result.createdTimestamp - message.createdTimestamp;

				result.edit({
					content: "",
					embed:{
						title: "Pong!",
						description: `Latency: ${ping}ms`
					}
				});
			}
		);
	}
};