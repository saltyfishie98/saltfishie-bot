const helper = require("../../../webassembly/helper.js");

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
		message.reply(`ermm... I'll give ${helper.genRandomNum(10)}/10`);
	}
};