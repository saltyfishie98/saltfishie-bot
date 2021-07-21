// const axios = require("axios").default;

const { announcer } = require("../eventType");

async function announceTestStreamup(client){
	announcer.on("test-streamup", () => {
		const annouceChannel = client.channels.cache.get("863447077094031393");
		const annouceBenChannel = client.channels.cache.get("865609005136216075");

		const embedMessage = {
			author: {
				name: client.user.username,
				icon_url: client.user.displayAvatarURL()
			},
			color: 3447003,
			title: "TESTING BOT: Channel went live event"
		};

		// send to test server
		annouceChannel.send({
			content: "Beep Boop :robot:",
			embed: embedMessage
		}).then(console.log("Annoucer: Announced test-streamup"));

		// send to Ben's channel
		annouceBenChannel.send({
			content: "Beep Boop :robot:",
			embed: embedMessage
		}).then(console.log("Annoucer: Announced test-streamup"));
	});
}

module.exports = { announceTestStreamup };