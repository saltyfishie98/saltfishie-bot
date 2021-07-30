module.exports = {
	commands: ["ratemywaifu", "rateMyWaifu"],
	shortDesc: "Give the definitive rating to your waifu",
	expectedArgs: {
		title: "!ratemywaifu",
		fields: [
			{
				name: "Syntax",
				value: "!ratemywaifu \"<name>\""
			},
			{	
				name: "Parameters",
				value: "name",
			},
			{
				name: "Example usage: ",
				value: "!ratemywaifu botbot",
			}
		]
	},
	minArgs: 1,
	callback: async (message, args, text) =>{
		let rating = Math.floor(Math.random() * 10);
		message.reply(`erm... I'll give ${rating}/10`);
	}
};