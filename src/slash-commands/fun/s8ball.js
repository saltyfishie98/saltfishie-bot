const responses = [
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes, definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful "
];

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

	cmdName: "8ball",
	callback: async (client, interaction, args, replyTo) => {
		let reply = responses[Math.floor(Math.random() * responses.length)];
		replyTo(interaction, `**8ball**: <@${interaction.member.user.id}> ${reply}`);
	}
};