module.exports = {
	commands: ["ping"],
	minArgs: 0,
	maxArgs: 0,
	callback: (message, args, text) => {
		message.channel.send("pong!");
	},
	requiredRoles: [],
	requiredPermissions: []
};