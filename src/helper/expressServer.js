const Express = require("express");
const app = Express();
const port = process.env.PORT || 3000;

const { verifyTwitchSignature } = require("./verifyTwitchSignature")
const { wakeDyno } = require("./herokuWake");

const Events = require("events");
const announcer = new Events();

function runServer() {
	app.use(Express.json({ verify: verifyTwitchSignature }));
	app.post("/webhook/streamup", (req, res) => {
		let challenge = req.body.challenge;
		res.status(200).send(challenge);
		console.log("Express: Posted challenge");

		try {
			if (req.body.event.broadcaster_user_login === "testBroadcaster")
				announcer.emit("test-broadcast")
			else
				announcer.emit("streamup");
		} catch (err) {
			console.log(err);
		}
	});

	app.get("/", (req, res) => {
		res.send("hello world")
	});

	const listener = app.listen(port, () => {
		const opts = { interval: 20 }
		wakeDyno("https://saltfishie-bot.herokuapp.com", opts);
		console.log("Express: Your app is listening on port " + listener.address().port);
	});
}

module.exports = { runServer, announcer };