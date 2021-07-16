const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
// const { requestAccessToken } = require("./helper/subcriptionPortal");
// const token = requestAccessToken(process.env.TWITCH_CLIENT_ID,
// 	process.env.TWITCH_CLIENT_SECRET).then(data => console.log(data));

// const { revokeAccessToken } = require("./helper/subcriptionPortal");
// revokeAccessToken(process.env.TWITCH_CLIENT_ID, "wxbd7kjg6pt29qz5q5j8fkpelybxmk");

///////////////////////////////////////////////////////////////////////////////////////
const { runServer, announcer } = require("./helper/expressServer");
runServer();

// const { subscriptionsPortal } = require("./helper/subcriptionPortal");
// subscriptionsPortal("query");
// subscriptionsPortal("create", "https://saltfishie-bot.herokuapp.com/webhook/streamup");
// subscriptionsPortal("delete", "5f90aa84-b815-4870-9121-eb6226b1061e");

///////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();
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

///////////////////////////////////////////////////////////////////////////////////////