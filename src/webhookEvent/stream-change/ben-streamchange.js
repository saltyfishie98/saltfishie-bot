// const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

const { announcer } = require("../eventType");

async function announceBenStreamChange(client) {
	announcer.on("ben-streamchange", (name, title) => {

		async function run() {
			const annouceChannel = client.channels.cache.get("845682082750922784");

			let embedMessage = {
				color: 15844367,
				title: "Update!",
				description: "Catch Ben on his stream on [👉***__Twitch__*** ](https://www.twitch.tv/benangz)!!! Let's hang out!",

				fields: [
					{
						name: "Currently streaming: ",
						value: `${name}‎‎‎‎‏‏`
					},
					{
						name: "‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ",
						value: `‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‎‏‏‎"*${title}*"‎‏ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‎‏‏`,
						inline: true
					},
					{ name: "\u200B", value: "\u200B" },
				],
			};

			annouceChannel.send({
				embed: embedMessage
			}).then(console.log("Annoucer: Announced streamchange"));
		}

		run();
	});
}

module.exports = { announceBenStreamChange };