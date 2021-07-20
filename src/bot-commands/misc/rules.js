module.exports = {
	commands: ["showRules", "showRule", "showrule"],
	expectedArgs: "",
	minArgs: 0,
	maxArgs: 0,
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (message, args, text) =>{

		let fetched = await message.channel.messages.fetch({ limit: 5 });
		message.channel.bulkDelete(fetched);

		if(message.channel.id === "866630865583603712"){
			const embedMessage = {
				color: 3447003,
				title: "By reacting to this message, you have agreed to the rules of this server"
			};

			message.channel.send({
				embed: embedMessage
			});
		}
	}
};