const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;

const { subscriptionsPortal } = require('./helper/subcriptionPortal');
const { verifyTwitchSignature } = require('./helper/verifyTwitchSignature')

const { wakeDyno } = require('./helper/herokuWake');
const DYNO_URL = 'https://my-app.herokuapp.com';

app.use(Express.json({ verify: verifyTwitchSignature }));
app.post("/webhook/streamlive", (req, res) => {
	let challenge = req.body.challenge;
	res.status(200).send(challenge);
	console.log('Express: '.yellow + 'Posted challenge');
	testAnnounce.emit('stream-live');
});

const listener = app.listen(port, () => {
	const opts = { interval: 10 }
	wakeDyno(DYNO_URL, opts);
	console.log("Express: ".cyan + "Your app is listening on port " + listener.address().port);
});

// subscriptionsPortal('query');

///////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', () => {
	console.log('Discordjs: '.cyan + 'Ready!\n');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	}
});

const Events = require('events');
const testAnnounce = new Events();
testAnnounce.on('stream-live', () => {
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
	console.log('testAnnouce: '.yellow + 'Announced\n');
});