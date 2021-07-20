const axios = require("axios").default;

const { announcer } = require("../eventType");

async function announceTestStreamup(client){
	announcer.on("test-streamup", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");

		const embedMessage = {
			author: {
				name: client.user.username,
				icon_url: client.user.displayAvatarURL()
			},
			color: 3447003,
			title: "TESTING BOT: Channel when live event"
		};

		// send to test server
		annouceChannel.send({
			content: "Beep Boop :robot:",
			embed: embedMessage
		}).then(console.log("Annoucer: Announced test-streamup"));

		// send to Ben's webhook
		axios.post(`${process.env.BEN_DISCORD_WEBHOOK}`, {
			content: "Beep Boop :robot:",
			embeds: [embedMessage]
		}).then(console.log("Annoucer: Announced test-streamup")).catch(err => console.log(err));
	});
}

module.exports = { announceTestStreamup };