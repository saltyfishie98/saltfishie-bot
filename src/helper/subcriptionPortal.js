const fetch = require("node-fetch");
const axios = require("axios").default;

///////////////////////////////////////////////////////////////////////////////////////
class subscriptionsPortal {
	constructor(twitchAccessToken, twitchClientId, twitchBroadcastId, twitchSigningSecret) {
		this.twitchAccessToken = twitchAccessToken;
		this.twitchClientId = twitchClientId;
		this.twitchBroadcastId = twitchBroadcastId;
		this.twitchSigningSecret = twitchSigningSecret;
	}

	subscription(commandType, inputArg = null, subscribeType = "stream.online") {
		let url = "https://api.twitch.tv/helix/eventsub/subscriptions";

		const createSub = {
			method: "POST",
			headers: {
				"Client-ID": this.twitchClientId,
				"Authorization": `Bearer ${this.twitchAccessToken}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				version: "1",
				type: subscribeType,
				"condition": {
					"broadcaster_user_id": this.twitchBroadcastId
				},
				"transport": {
					"method": "webhook",
					"callback": inputArg,
					"secret": this.twitchSigningSecret
				}
			})
		};

		const deleteSub = {
			method: "DELETE",
			headers: {
				"Client-ID": this.twitchClientId,
				"Authorization": `Bearer ${this.twitchAccessToken}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: inputArg
			})
		};

		const querySub = {
			method: "GET",
			headers: {
				"Client-ID": this.twitchClientId,
				"Authorization": `Bearer ${this.twitchAccessToken}`,
			}
		};

		const httpFetch = (command) => {
			fetch(url, command)
				.then(res => res.json())
				.then(data => { console.log("\nhttpFetch:"); console.log(data); console.log("\n"); })
				.catch(err => console.log(err));
		};

		switch (commandType) {
			case "create":
				if (inputArg !== null) httpFetch(createSub);
				else throw new Error("createSub Error: No specified url");
				break;

			case "delete":
				if (inputArg !== null) httpFetch(deleteSub);
				else throw new Error("deleteSub Error: No specified id");
				break;

			case "query":
				httpFetch(querySub);
				break;

			default:
				throw new Error("subscriptionsPortal: Invalid command");
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////
	async requestAccessToken(clientId = this.twitchClientId, clientSecret = this.twitchSigningSecret) {
		const url = "https://id.twitch.tv/oauth2/token";
		const Params = {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				client_id: clientId,
				client_secret: clientSecret,
				grant_type: "client_credentials"
			}),
			method: "POST"
		};

		return await fetch(url, Params)
			.then(response => response.json())
			.then(data => { return data; })
			.catch(err => console.log(err));
	}

	///////////////////////////////////////////////////////////////////////////////////////
	revokeAccessToken(clientId = this.twitchClientId, accessToken = this.twitchAccessToken) {
		const url = `https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${accessToken}`;
		axios.post(url)
			.then(res => {
				if (res.status !== 200) {
					throw new Error("revokeAccessToken: response code not 200");
				} else {
					console.log("revokeAccessToken: Success!");
				}
			})
			.catch(err => console.log(err.response.data));
	}

	///////////////////////////////////////////////////////////////////////////////////////
	queryAccessToken(accessToken = this.twitchAccessToken) {
		const url = "https://id.twitch.tv/oauth2/validate";
		axios({
			method: "get",
			url: url,
			headers: { Authorization: `OAuth ${accessToken}` }
		}).then(res => { console.log(res.data); }).catch(err => console.log(err.response.data));
	}

	///////////////////////////////////////////////////////////////////////////////////////
	async queryChannelInfo(
		broadcastId = this.twitchBroadcastId,
		accessToken = this.twitchAccessToken,
		clientId = this.twitchClientId) {
		let url = "";
		url = `https://api.twitch.tv/helix/channels?broadcaster_id=${broadcastId}`;

		return axios({
			method: "get",
			url: url,
			headers: {
				"Authorization": `Bearer ${accessToken}`,
				"Client-Id": clientId
			}
		});
	}

	async searchChannelInfo(
		broadcastName,
		accessToken = this.twitchAccessToken,
		clientId = this.twitchClientId) {
		let url = "";
		url = `https://api.twitch.tv/helix/search/channels?query=${broadcastName}`;

		return axios({
			method: "get",
			url: url,
			headers: {
				"Authorization": `Bearer ${accessToken}`,
				"Client-Id": clientId
			}
		});
	}
}

///////////////////////////////////////////////////////////////////////////////////////
const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const twitchBroadcastId = process.env.TWITCH_BROADCASTER_ID;
const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;
const twitchClientId = process.env.TWITCH_CLIENT_ID;

const benTwitchSigningSecret = process.env.BEN_TWITCH_SIGNING_SECRET;
const benTwitchBroadcastId = process.env.BEN_TWITCH_BROADCASTER_ID;
const benTwitchAccessToken = process.env.BEN_TWITCH_ACCESS_TOKEN;
const benTwitchClientId = process.env.BEN_TWITCH_CLIENT_ID;

const myPortal = new subscriptionsPortal(
	twitchAccessToken, twitchClientId, twitchBroadcastId, twitchSigningSecret
);

const benPortal = new subscriptionsPortal(
	benTwitchAccessToken, benTwitchClientId, benTwitchBroadcastId, benTwitchSigningSecret
);

///////////////////////////////////////////////////////////////////////////////////////
module.exports = { subscriptionsPortal, myPortal, benPortal };