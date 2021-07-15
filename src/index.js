const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');
const Express = require('express');

const accessToken = process.env.TWITCH_ACCESS_TOKEN
const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';

const createSub = {
	method: "POST",
	headers: {
		"Client-ID": process.env.TWITCH_CLIENT_ID,
		"Authorization": `Bearer ${accessToken}`,
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		version: "1",
		type: "stream.online",
		"condition": {
			"broadcaster_user_id": process.env.TWITCH_BROADCASTER_ID
		},
		"transport": {
			"method": "webhook",
			"callback": "https://saltfishie-bot.herokuapp.com/webhook/streamlive",
			"secret": process.env.TWITCH_SIGNING_SECRET
		}
	})
};

const deleteSub = {
	method: "DELETE",
	headers: {
		"Client-ID": process.env.TWITCH_CLIENT_ID,
		"Authorization": `Bearer ${accessToken}`,
		"Content-Type": "application/json"
	},
	body: JSON.stringify({
		id: "4e4293ea-9870-49bb-b1cc-3c5580c5737a"
	})
};

const querySub = {
	method: "GET",
	headers: {
		"Client-ID": process.env.TWITCH_CLIENT_ID,
		"Authorization": `Bearer ${accessToken}`,
	}
};


fetch(url, querySub)
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));

const app = Express();
const port = process.env.PORT || 3000;
const crypto = require('crypto');
let verified = false;

const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const verifyTwitchSignature = (req, res, buf, encoding) => {
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
		+ crypto.createHmac("sha256", twitchSigningSecret).update(messageID + timestamp + buf).digest("hex")

	console.log("messageSig: " + messageSig);
	console.log("computedSig: " + computedSig);

	if (computedSig !== messageSig) {
		throw new Error("invalid signiture!");
	} else {
		console.log("verification success");
		verified = true;
	}
};

const axios = require("axios").default;

app.use(Express.json({ verify: verifyTwitchSignature }));
app.post("/webhook/streamlive", (req, res) => {
	if (verified) {
		let challenge = req.body.challenge;
		res.status(200).send(challenge);
		console.log("Subscribed");
		started = true
	}

	const content = ":wave: stream started!!!";
	const avatarUrl = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
	axios.post(process.env.DISCORD_WEBHOOK_URL, {
		content: content,
		embeds: [
			{
				image: {
					url: avatarUrl,
				},
			},
		],
	})
		.then((discordResponse) => {
			console.log("Success!");
			res.status(204).send();
		})
		.catch((err) => console.error(`Error sending to Discord: ${err}`));

	console.log("Stream started!");
});

const listener = app.listen(port, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

const Discord = require('discord.js');
const { start } = require('repl');
const Client = new Discord.Client();

Client.on('ready', () => {
	console.log('ready');
});

Client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	}
});

Client.login(process.env.TOKEN);