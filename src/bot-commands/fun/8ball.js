const helper = require("../../../webassembly/helper.js");

module.exports = {
	commands: ["8Ball", "8ball"],
	shortDesc: "A magic 8 ball",
	expectedArgs: {
		title: "!8Ball",
		fields: [
			{
				name: "Syntax",
				value: "!8Ball \"<question>\""
			},
			{	
				name: "Parameters",
				value: "question",
			},
			{
				name: "Example usage: ",
				value: "!8Ball how will the weather be today",
			}
		]
	},
	minArgs: 1,
	callback: async (message, args, text) =>{
		let reply = helper.response8Ball();
		message.channel.send(`**8ball**: <@${message.author.id}> ${reply}`);
	}
};