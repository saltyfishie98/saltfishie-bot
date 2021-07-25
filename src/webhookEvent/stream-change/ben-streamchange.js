// const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

const { announcer } = require("../eventType");

const greetings = [
	"**Hi friends!**   👋👋👋 ",
	"📢📢📢   **ANNOUNCEMENT!!! ANNOUNCEMENT!!!**   📢📢📢 ",
	"**Yoo... Wassup...!** "
];

async function announceBenStreamChange(client) {
	announcer.on("ben-streamchange", (name, title) => {

		async function run() {
			const annouceChannel = client.channels.cache.get("845682082750922784");

			let embedMessage = {
				color: 15844367,
				title: greetings[Math.floor(Math.random() * greetings.length)],
				description: "Catch Ben on his stream on [👉***__Twitch__*** ](https://www.twitch.tv/benangz)!!! Let's hang out!",

				fields: [
					{
						name: "Currently streaming: ",
						value: `${name}‎‎‎‎‏‏`
					},
					{
						name: "‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ",
						value: `‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎"*${title}*"‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏`,
						inline: true
					},
					{ name: "\u200B", value: "\u200B" },
				],

				image: {
					url: "https://saltfishie-bot.herokuapp.com/assets/benangV1.gif",
					inline: true
				},
			};

			annouceChannel.send({
				embed: embedMessage
			}).then(console.log("Annoucer: Announced streamup"));
		}

		run();
	});
}

module.exports = { announceBenStreamChange };