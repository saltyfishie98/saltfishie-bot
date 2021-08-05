module.exports = {
	commands: ["ping"],
	shortDesc: "Ping hosting server for respond",
	maxArgs: 0,
	callback: (message, args, text) => {
		message.channel.send("Pong!");
	}
};