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

	subscription(commandType, inputArg = null) {
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
				type: "stream.online",
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
		}

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
				break;
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////
	async requestAccessToken(clientId = this.twitchClientId, clientSecret = this.twitchSigningSecret) {
		const url = "https://id.twitch.tv/oauth2/token"
		const Params = {
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				client_id: clientId,
				client_secret: clientSecret,
				grant_type: "client_credentials"
			}),
			method: "POST"
		}

		return await fetch(url, Params)
			.then(response => access_token = response.json())
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
			method: 'get',
			url: url,
			headers: { Authorization: `OAuth ${accessToken}` }
		}).then(res => { console.log(res.data) }).catch(err => console.log(err.response.data));
	}
}

module.exports = { subscriptionsPortal };