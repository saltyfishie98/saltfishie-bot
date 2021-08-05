const helper = require("../../../webassembly/helper.js");

module.exports = {
	registration:{
		data: {
			name: "8ball",
			description: "A magic 8 ball",
			options: [
				{
					name: "question",
					description: "Questio to ask the 8ball",
					required: true,
					type: 3
				}
			]
		}
	},

	cmdName: "8ball",
	callback: async (client, interaction, args, replyTo) => {
		let reply = helper.response8Ball();
		replyTo(interaction, `**8ball**: <@${interaction.member.user.id}> ${reply}`);
	}
};