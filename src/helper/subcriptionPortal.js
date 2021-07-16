const fetch = require("node-fetch");

function subscriptionsPortal(commandType, inputArg = null) {
	let accessToken = process.env.TWITCH_ACCESS_TOKEN;
	let url = "https://api.twitch.tv/helix/eventsub/subscriptions";

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
				"callback": inputArg,
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
			id: inputArg
		})
	};

	const querySub = {
		method: "GET",
		headers: {
			"Client-ID": process.env.TWITCH_CLIENT_ID,
			"Authorization": `Bearer ${accessToken}`,
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

async function requestAccessToken(clientId, clientSecret) {
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

const axios = require("axios").default;
function revokeAccessToken(clientId, accessToken) {
	const url = `https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${accessToken}`;
	axios.post(url)
		.then(res => {
			if (res.status !== 200) {
				throw new Error("revokeAccessToken:".red + " response code not 200");
			} else {
				console.log("revokeAccessToken: Success!".green);
			}
		})
		.catch(err => console.log(err.response.data));
}

module.exports = { subscriptionsPortal, requestAccessToken, revokeAccessToken };