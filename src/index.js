const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const twitchBroadcastId = process.env.TWITCH_BROADCASTER_ID;
const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;
const twitchClientId = process.env.TWITCH_CLIENT_ID;

const benTwitchSigningSecret = process.env.BEN_TWITCH_SIGNING_SECRET;
const benTwitchBroadcastId = process.env.BEN_TWITCH_BROADCASTER_ID;
const benTwitchAccessToken = process.env.BEN_TWITCH_ACCESS_TOKEN;
const benTwitchClientId = process.env.BEN_TWITCH_CLIENT_ID;

const { subscriptionsPortal } = require("./helper/subcriptionPortal")
const { runServer, announcer } = require("./helper/expressServer");

const registerSubUrl = "https://saltfishie-bot.herokuapp.com/webhook/streamup";

const myPortal = new subscriptionsPortal(
	twitchAccessToken, twitchClientId, twitchBroadcastId, twitchSigningSecret
);
// myPortal.queryAccessToken();
// myPortal.subscription('query');
// myPortal.subscription("delete", "");
// myPortal.subscription("create", registerSubUrl);

const benPortal = new subscriptionsPortal(
	benTwitchAccessToken, benTwitchClientId, benTwitchBroadcastId, benTwitchSigningSecret
);
// benPortal.queryAccessToken();
// benPortal.subscription('query');
// benPortal.subscription("delete", "");
// benPortal.subscription("create", registerSubUrl);

// checkChannelData();

const signingSecretArry = [
	benPortal.twitchSigningSecret,
	myPortal.twitchSigningSecret
]

runServer(signingSecretArry);

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();

const benWebhook = "https://discord.com/api/webhooks/865601089603371058/PTC4MyH45biOhsDdFqXNxvy60F53zAPit0PWwlHaNqAJu4evhkP13nCgAod1HIji1jqA";

const greetings = [
	"**Hi friends!**   👋👋👋 ",
	"📢📢📢   **ANNOUNCEMENT!!! ANNOUNCEMENT!!!**   📢📢📢 ",
	"**Yoo... Wassup...!** "
];

///////////////////////////////////////////////////////////////////////////////////////
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
// async function checkChannelData() {
// 	let res = await (myPortal.queryChannelInfo());
// 	console.log(res.data.data[res.data.data.length - 1]);
// }
// checkChannelData()

announcer.on("ben-streamup", () => {
	const fetchUser = async () => {
		return client.users.fetch("393367876397957121")
	};

	const getChannelData = async () => {
		let res = await benPortal.queryChannelInfo();
		return res.data.data[0];
	}

	async function run() {
		let channelData = await getChannelData();
		let profile = await fetchUser();

		let embedMessage = {
			color: 15844367,
			title: greetings[Math.floor(Math.random() * greetings.length)],
			description: "Catch Ben on his stream on [👉***__Twitch__*** ](https://www.twitch.tv/benangz)!!! Let's hang out!",

			fields: [
				{
					name: "Currently streaming: ",
					value: `${channelData.game_name}‎‎‎‎‏‏`
				},
				{
					name: `‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ `,
					value: `‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎"*${channelData.title}*"‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏`,
					inline: true
				},
				{ name: '\u200B', value: '\u200B' },
			],

			image: {
				url: "https://saltfishie-bot.herokuapp.com/assets/benangV1.gif",
				inline: true
			},
		};

		axios.post(benWebhook, {
			content: "Beep Boop :robot:",
			embeds: [embedMessage]

		}).then(console.log("Annoucer: Announced ben-streamup")).catch(err => console.log(err.data));
	}

	run();
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