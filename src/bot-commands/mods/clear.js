module.exports = {
	commands: ["clear", "cls", "Clear"],
	shortDesc: "clear a specified amount of message/s",
	expectedArgs: {
		title: "!clear",
		fields: [
			{
				name: "Syntax",
				value: "!clear \"<num>\""
			},
			{	
				name: "Parameters",
				value: "num",
			},
			{
				name: "Example usage: ",
				value: "!clear 5",
			}
		]
	},
	minArgs: 1,
	maxArgs: 1,
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (message, args, text) =>{
		let fetched;
		try{
			if(`${args}` === "all"){
				do {
					fetched = await message.channel.messages.fetch({ limit: 50 });
					message.channel.bulkDelete(fetched);
				}
				while(fetched.size >= 2);
				console.log("cleared");
			} else {
				args = parseInt(args) + 1;
				fetched = await message.channel.messages.fetch({ limit: args });
				message.channel.bulkDelete(fetched);
			}} 
		catch(err) {
			console.log(err);
		}
	}
};