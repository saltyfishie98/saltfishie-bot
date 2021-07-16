const dotenv = require('dotenv');
dotenv.config();

const Events = require('events');
const announce = new Events();

///////////////////////////////////////////////////////////////////////////////////////
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;

const { subscriptionsPortal } = require('./helper/subcriptionPortal');
const { verifyTwitchSignature } = require('./helper/verifyTwitchSignature')

const { wakeDyno } = require('./helper/herokuWake');

app.use(Express.json({ verify: verifyTwitchSignature }));
app.post("/webhook/streamup", (req, res) => {
	let challenge = req.body.challenge;
	res.status(200).send(challenge);
	console.log('Express: Posted challenge');

	try {
		if (req.body.event.broadcaster_user_login === 'testBroadcaster')
			announce.emit('test-broadcast')
		else
			announce.emit('streamup');
	} catch (err) {
		console.log(err);
	}
});

app.get("/", (req, res) => {
	res.send('hello world')
});

const listener = app.listen(port, () => {
	const opts = { interval: 20 }
	wakeDyno('https://saltfishie-bot.herokuapp.com', opts);
	console.log("Express: Your app is listening on port " + listener.address().port);
});

//subscriptionsPortal('query');
// subscriptionsPortal('create', "https://saltfishie-bot.herokuapp.com/webhook/streamup");

///////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log('Discordjs: Ready!\n');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	}
});

announce.on('streamup', () => {
	const annouceChannel = client.channels.cache.get("863447077094031393");
	annouceChannel.send({
		embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.displayAvatarURL()
			},
			title: "Stream going live",
			thumbnail: {
				url: "https://static-cdn.jtvnw.net/jtv_user_pictures/4430880f-aff9-4188-88e8-e52f7f67e81f-profile_image-70x70.png"
			},
			description: "Check it out [here](https://www.twitch.tv/benangz)",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.displayAvatarURL(),
				text: "© Example"
			}
		}
	});
	console.log('testAnnouce: Announced\n');
});

announce.on('test-broadcast', () => {
	const annouceChannel = client.channels.cache.get("863447077094031393");
	annouceChannel.send({
		embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.displayAvatarURL()
			},
			title: "testBroadcast",
		}
	});
	console.log('testAnnouce: test Announced\n');
});

////////////////////////////////////////////////////////////////////////////////

// const { requestAccessToken } = require('./helper/subcriptionPortal');
// const token = requestAccessToken(process.env.TWITCH_CLIENT_ID,
// 	process.env.TWITCH_CLIENT_SECRET).then(data => console.log(data));

// const { revokeAccessToken } = require('./helper/subcriptionPortal');
// revokeAccessToken(process.env.TWITCH_CLIENT_ID, 'wxbd7kjg6pt29qz5q5j8fkpelybxmk');