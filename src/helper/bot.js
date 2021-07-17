const Discord = require("discord.js");
const client = new Discord.Client();

const { announcer } = require("./expressServer");

function runBot() {
	client.login(process.env.TOKEN);

	client.on("ready", () => {
		console.log("Discordjs: Ready!\n");
	});

	client.on("message", message => {
		if (message.content === "!ping") {
			message.channel.send("Pong!");
		}
	});

	announcer.on("streamup", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");
		annouceChannel.send({
			embed: {
				color: 3447003,
				author: {
					name: client.user.username,
					icon_url: client.user.displayAvatarURL()
				},
				title: "Stream going live",
				thumbnail: {
					url: "https://static-cdn.jtvnw.net/jtv_user_pictures/4430880f-aff9-4188-88e8-e52f7f67e81f-profile_image-70x70.png"
				},
				description: "Check it out [here](https://www.twitch.tv/benangz)",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.displayAvatarURL(),
					text: "© Example"
				}
			}
		});
		console.log("testAnnouce: Announced\n");
	});

	announcer.on("test-broadcast", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");
		annouceChannel.send({
			embed: {
				color: 3447003,
				author: {
					name: client.user.username,
					icon_url: client.user.displayAvatarURL()
				},
				title: "testBroadcast",
			}
		});
		console.log("testAnnouce: test Announced\n");
	});
}

module.exports = { runBot };