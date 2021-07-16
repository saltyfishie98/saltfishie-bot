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
			"callback": "https://76677fb4ebdc.ngrok.io/webhook/streamlive",
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
		id: "fc935387-1cec-4af6-a9b8-dd973e600c0e"
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
		+ crypto.createHmac("sha256", twitchSigningSecret).update(messageID + timestamp + buf).digest("hex");

	if (computedSig !== messageSig) {
		throw new Error("invalid signiture!");
	} else {
		console.log("verification success");
		verified = true;
	}
};
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log('ready');
});

const Events = require('events');
const testAnnouce = new Events();

testAnnouce.on('stream-live', () => {
	const exampleEmbed =
		new Discord.MessageEmbed()
			.setTitle('Live on twitch')
			.setURL('https://www.twitch.tv/');
	const annouceChannel = client.channels.cache.get("863447077094031393");
	console.log('annoucing');
	annouceChannel.send(exampleEmbed);
});

app.use(Express.json({ verify: verifyTwitchSignature }));
app.post("/webhook/streamlive", (req, res) => {
	if (verified) {
		let challenge = req.body.challenge;
		res.status(200).send(challenge);
		res.status(200).send(challenge);
		console.log("Subscribed");
		started = true
	}

	testAnnouce.emit('stream-live');
	console.log("Stream started!");
});

const { wakeDyno } = require('heroku-keep-awake');
const DYNO_URL = 'https://my-app.herokuapp.com';

const listener = app.listen(port, () => {
	const opts = {
		interval: 25
	}
	wakeDyno(DYNO_URL, opts);

	console.log("Your app is listening on port " + listener.address().port);
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	}
});
