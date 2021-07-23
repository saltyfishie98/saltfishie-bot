module.exports = {
	registration: {
		data: {
			name: "ping",
			description: "a simple ping command"
		}
	},

	cmdName: "ping",
	callback: async (client, interaction, args, replyTo) => {
		await replyTo(interaction, "Pong!");
	}
};