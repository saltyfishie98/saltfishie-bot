const fetch = require('node-fetch');

function subscriptionsPortal(commandType, inputArg = null) {
	let accessToken = process.env.TWITCH_ACCESS_TOKEN;
	let url = 'https://api.twitch.tv/helix/eventsub/subscriptions';

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
			.then(data => { console.log('\nhttpFetch:'.yellow); console.log(data); console.log('\n'); })
			.catch(err => console.log(err));
	}

	let inputCommand;
	if (commandType === 'create') {
		if (inputArg !== null) {
			httpFetch(createSub);
		} else {
			throw new Error('createSub Error: No specified url');
		}

	} else if (commandType === 'delete') {
		if (inputArg !== null) {
			httpFetch(deleteSub);
		} else {
			throw new Error('deleteSub Error: No specified id');
		}

	} else if (commandType === 'query') {
		httpFetch(querySub);

	} else {
		throw new Error('subscriptionsPortal: Invalid command');
	}
}

module.exports = { subscriptionsPortal };