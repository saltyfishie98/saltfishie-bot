module.exports = {
	registration:{
		data: {
			name: "clear",
			description: "Clear specified amount of message",
			options: [
				{
					name: "amount",
					description: "Amount to clear",
					required: true,
					type: 3
				}
			]
		}
	},

	cmdName: "clear",
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (client, interaction, args, replyTo) => {
		let fetched;

		if(typeof args["amount"] !== "string" && args !== "all"){
			return "invalid input argument";
		}

		try{
			await replyTo(interaction, "clearing...");
			const channel = await client.channels.cache.get(interaction.channel_id);
			if(args["amount"] === "all"){
				do {
					fetched = await channel.messages.fetch({ limit: 100 });
					channel.bulkDelete(fetched);
				}
				while(fetched.size >= 2);
			} else {
				fetched = await channel.messages.fetch({ limit: (parseInt(args["amount"]) + 1) });
				channel.bulkDelete(fetched);
			}
		}catch(err) {
			await replyTo(interaction, "You can only bulk delete messages that are under 14 days old.");
		}
	}
};