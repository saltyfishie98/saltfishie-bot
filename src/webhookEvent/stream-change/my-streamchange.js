const dotenv = require("dotenv");
dotenv.config();

const { announcer } = require("../eventType");

async function announceMyStreamChange(client) {
	announcer.on("my-streamchange", (name, title) => {
		const annouceChannel = client.channels.cache.get("863447077094031393");

		client.users.fetch("335651941671763969") // ben profile
			.then(profile => {
				const embedMessage = {
					author: {
						name: profile.username,
						icon_url: profile.displayAvatarURL()
					},
					color: 3447003,
					title: name,
					description: title,
				};

				annouceChannel.send({
					embed: embedMessage
				}).then(console.log("Annoucer: Announced my stream-change"));
			});

	});
}

module.exports = { announceMyStreamChange };
