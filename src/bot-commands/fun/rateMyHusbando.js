module.exports = {
	commands: ["ratemyhusbando", "rateMyHusbando"],
	shortDesc: "Give the definitive rating to your husbando",
	expectedArgs: {
		title: "!ratemyhusbando",
		fields: [
			{
				name: "Syntax",
				value: "!ratemyhusbando \"<name>\""
			},
			{	
				name: "Parameters",
				value: "name",
			},
			{
				name: "Example usage: ",
				value: "!ratemyhusbando botbot",
			}
		]
	},
	minArgs: 1,
	callback: async (message, args, text) =>{
		let rating = Math.floor(Math.random() * 10);
		message.reply(`erm... I'll give ${rating}/10`);
	}
};