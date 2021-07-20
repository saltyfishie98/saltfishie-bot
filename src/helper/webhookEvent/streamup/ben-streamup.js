const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

const { announcer, benPortal } = require("../eventType");

const greetings = [
	"**Hi friends!**   👋👋👋 ",
	"📢📢📢   **ANNOUNCEMENT!!! ANNOUNCEMENT!!!**   📢📢📢 ",
	"**Yoo... Wassup...!** "
];

async function announceBenStreamup(client) {
	announcer.on("ben-streamup", () => {

		async function run() {
			let res = await benPortal.queryChannelInfo();
			let channelData = res.data.data[0];

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

			axios.post(`${process.env.BEN_DISCORD_WEBHOOK}`, {
				content: "Beep.. Boop..		 :robot:",
				embeds: [embedMessage]
			}).then(console.log("Annoucer: Announced ben-streamup")).catch(err => console.log(err));
		}

		run();
	});
}

module.exports = { announceBenStreamup };