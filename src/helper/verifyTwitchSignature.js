const crypto = require('crypto');

const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;

function verifyTwitchSignature(req, res, buf, encoding) {
	const messageID = req.headers["twitch-eventsub-message-id"];
	const timestamp = req.headers["twitch-eventsub-message-timestamp"];
	const messageSig = req.headers["twitch-eventsub-message-signature"];

	if (!twitchSigningSecret) {
		console.log(`Twitch signing secret is empty.`);
		throw new Error("Twitch signing secret is empty.");
	}

	const time = Math.floor(new Date().getTime() / 1000);

	if (Math.abs(time - timestamp) > 600) {
		console.log(`Verification Failed: timestamp > 10 minutes. Message Id: ${messageID}.`);
		throw new Error("Ignore this request.");
	}

	const computedSig = "sha256="
		+ crypto.createHmac("sha256", twitchSigningSecret)
			.update(messageID + timestamp + buf)
			.digest("hex");

	console.log(messageSig);
	console.log(computedSig);

	if (computedSig !== messageSig) {
		throw new Error("verifyTwitchSignature: Invalid signiture!");
	} else {
		console.log("verifyTwitchSignature: verification success");
	}
};

module.exports = { verifyTwitchSignature };