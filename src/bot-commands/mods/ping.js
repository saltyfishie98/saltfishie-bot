module.exports = {
	commands: ["ping"],
	shortDesc: "Ping hosting server for respond",
	minArgs: 0,
	maxArgs: 0,
	callback: (message, args, text) => {
		message.channel.send("Pong!");
	},
	requiredRoles: [],
	requiredPermissions: []
};