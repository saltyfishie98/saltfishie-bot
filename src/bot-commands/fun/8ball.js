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
		let reply = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(`**8ball**: <@${message.author.id}> ${reply}`);
	}
};