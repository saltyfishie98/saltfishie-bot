module.exports = {
	commands: ["clear", "cls"],
	expectedArgs: "",
	minArgs: 0,
	maxArgs: 1,
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (message, args = 100, text) =>{
		let fetched;
		do {
			fetched = await message.channel.messages.fetch({ limit: 100 });
			message.channel.bulkDelete(fetched);
		}
		while(fetched.size >= 2);
		console.log("cleared");
	}
};