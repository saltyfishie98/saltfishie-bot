const { default: axios } = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

const { announcer } = require("./expressServer");

const benWebhook = "https://discord.com/api/webhooks/865601089603371058/PTC4MyH45biOhsD"
	+ "dFqXNxvy60F53zAPit0PWwlHaNqAJu4evhkP13nCgAod1HIji1jqA";

const greetings = [
	"Hi friends!",
	"ANNOUNCEMENT!!! ANNOUNCEMENT!!!",
	"Yoo... Wassup...!"
];

///////////////////////////////////////////////////////////////////////////////////////
function runBot() {
	client.login(process.env.TOKEN);

	///////////////////////////////////////////////////////////////////////////////////////
	client.on("ready", () => {
		console.log("Discordjs: Ready!\n");
	});

	///////////////////////////////////////////////////////////////////////////////////////
	client.on("message", message => {
		if (message.content === "!ping") {
			message.channel.send("Pong!");
		}
	});

	///////////////////////////////////////////////////////////////////////////////////////
	announcer.on("streamup", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");

		const imgUrl = "https://media.giphy.com/media/4zSgJWt5RQ2yQ5j4hj/giphy.gif";
		const announceDiscription = "Catch saltyfishie on his stream on Twitch! "
			+ "[Let's hang out](https://www.twitch.tv/benangz)!";

		client.users.fetch("335651941671763969") // ben profile
			.then(profile => {
				const embedMessage = {
					author: {
						name: profile.username,
						icon_url: profile.displayAvatarURL()
					},
					color: 3447003,
					title: greetings[Math.floor(Math.random() * greetings.length)],
					image: {
						url: imgUrl
					},
					description: announceDiscription
				};

				axios.post(benWebhook, {
					content: "Beep Boop :robot:",
					embeds: [embedMessage]
				}).then(console.log("Annoucer: Announced streamup"));

				annouceChannel.send({
					embed: embedMessage
				}).then(console.log("Annoucer: Announced streamup"));
			});
	});

	///////////////////////////////////////////////////////////////////////////////////////
	announcer.on("ben-streamup", () => {
		client.users.fetch("393367876397957121") // ben profile
			.then(profile => {
				const embedMessage = {
					color: 3447003,
					title: greetings[Math.floor(Math.random() * greetings.length)],
					image: {
						url: "https://saltfishie-bot.herokuapp.com/assets/benang.gif"
					},
					description: "Catch Ben on his stream on Twitch! [Let's hang out](https://www.twitch.tv/benangz)!"
				};

				axios.post(benWebhook, {
					content: "Beep Boop :robot:",
					embeds: [embedMessage]

				}).then(console.log("Annoucer: Announced ben-streamup"));
			});
	});

	///////////////////////////////////////////////////////////////////////////////////////
	announcer.on("test-broadcast", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");

		const embedMessage = {
			author: {
				name: client.user.username,
				icon_url: client.user.displayAvatarURL()
			},
			color: 3447003,
			title: "TESTING BOT"
		};

		annouceChannel.send({
			content: "Beep Boop :robot:",
			embed: embedMessage
		}).then(console.log("Annoucer: Announced test-broadcast"));
	});
	///////////////////////////////////////////////////////////////////////////////////////
}

module.exports = { runBot };