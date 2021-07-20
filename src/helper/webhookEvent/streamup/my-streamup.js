const dotenv = require("dotenv");
dotenv.config();

const { announcer, myPortal } = require("../eventType");

const greetings = [
	"**Hi friends!**   👋👋👋 ",
	"📢📢📢   **ANNOUNCEMENT!!! ANNOUNCEMENT!!!**   📢📢📢 ",
	"**Yoo... Wassup...!** "
];

async function announceMyStreamup(client) {
	announcer.on("my-streamup", () => {
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

				annouceChannel.send({
					embed: embedMessage
				}).then(console.log("Annoucer: Announced streamup"));
			});

	});
}

module.exports = { announceMyStreamup };
