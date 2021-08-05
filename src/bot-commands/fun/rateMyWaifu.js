const helper = require("../../../webassembly/helper.js");

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
		message.reply(`ermm... I'll give ${helper.genRandomNum(10)}/10`);
	}
};