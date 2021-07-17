const Express = require("express");
const app = Express();
const port = process.env.PORT || 3000;

const { wakeDyno } = require("./herokuWake");

const Events = require("events");
const announcer = new Events();
const crypto = require("crypto");

function runServer(twitchSigningSecret) {
	let validSignature = false;

	function verifyTwitchSignature(req, res, buf, encoding) {
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
	app.post("/webhook/streamup", (req, res) => {
		if (validSignature) {
			let challenge = req.body.challenge;
			res.status(200).send(challenge);
			console.log("\nExpress: Posted challenge");

			switch (req.body.event.broadcaster_user_id) {
				case "609051650":
					announcer.emit("ben-streamup");
					break;

				case "71843094":
					announcer.emit("streamup");
					break;

				default:
					announcer.emit("streamup");
					announcer.emit("ben-streamup");
					announcer.emit("test-broadcast");
					break;
			}
			validSignature = false;

		} else {
			res.status(400).send();
		}
	});

	app.get("/", (req, res) => {
		res.send("hello world")
	});

	var path = require("path");
	app.get("/assets/benangV1.gif", (req, res) => {
		res.sendFile(path.join(__dirname, "../../assets", "benangV1.gif"))
	});
}

const listener = app.listen(port, () => {
	const opts = { interval: 20 }
	wakeDyno("https://saltfishie-bot.herokuapp.com", opts);
	console.log("Express: Your app is listening on port " + listener.address().port);
});

module.exports = { runServer, announcer };