const axios = require("axios").default;

const Express = require("express");
const app = Express();
const path = require("path");
const port = process.env.PORT || 3000;

const webhookEventHandler = require("../webhookEvent");

const crypto = require("crypto");

function wakeDyno(url, options = {}) {
	const { interval = 29, logging = true } = options;
	const milliseconds = interval * 60000;

	setTimeout(() => {
		axios.get(url)
			.then((res) => logging && console.log(res.statusText))
			.catch(() => logging && console.log("Error attempting to wake the dyno"))
			.finally(() => wakeDyno(url, options));

	}, milliseconds);
}

function runServer(twitchSigningSecret) {
	let validSignature = false;

	function verifyTwitchSignature(req, res, buf) {
		const messageID = req.headers["twitch-eventsub-message-id"];
		const timestamp = req.headers["twitch-eventsub-message-timestamp"];
		const messageSig = req.headers["twitch-eventsub-message-signature"];

		const time = Math.floor(new Date().getTime() / 1000);

		if (Math.abs(time - timestamp) > 600) {
			console.log(`Verification Failed: timestamp > 10 minutes. Message Id: ${messageID}.`);
			throw new Error("Ignore this request.");
		}

		console.log("");

		for (let secret of twitchSigningSecret) {
			const computedSig = "sha256="
				+ crypto.createHmac("sha256", secret)
					.update(messageID + timestamp + buf)
					.digest("hex");

			if (computedSig !== messageSig) {
				console.log("verifyTwitchSignature: Invalid signiture!");
			} else {
				console.log("verifyTwitchSignature: verification success");
				validSignature = true;
			}
		}
	}

	app.use(Express.json({ verify: verifyTwitchSignature }));
	app.post("/webhooks", async (req, res) => {
		if (validSignature) {
			let challenge = req.body.challenge;
			res.status(200).send(challenge);
			console.log("\nExpress: Posted challenge");

			webhookEventHandler(req.body);
			validSignature = false;
		} else {
			res.status(400).send();
		}
	});

	app.get("/", (req, res) => {
		res.send("hello world");
	});

	app.get("/assets/benangV1.gif", (req, res) => {
		res.sendFile(path.join(__dirname, "../../assets", "benangV1.gif"));
	});
}

const listener = app.listen(port, () => {
	const opts = { interval: 20 };
	wakeDyno("https://saltybottie.herokuapp.com", opts);
	console.log("Express: Your app is listening on port " + listener.address().port);
});

module.exports = { runServer };