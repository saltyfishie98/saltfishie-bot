const dotenv = require('dotenv');
dotenv.config();

const fetch = require('node-fetch');

const accessToken = process.env.TWITCH_ACCESS_TOKEN

const Url = "https://api.twitch.tv/helix/eventsub/subscriptions";

const Params = {
	method: "POST",
	headers: {
		"Client-ID": process.env.TWITCH_CLIENT_ID,
		"Authorization": `Bearer ${accessToken}`,
		"Content-Type": "application/json"
	},
	body: {
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
	}
};

let respondData = "";
fetch(Url, Params).then(response => { respondData = response.json() });
console.log(respondData);