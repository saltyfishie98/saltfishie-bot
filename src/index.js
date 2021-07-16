const dotenv = require('dotenv');
const colors = require('colors');
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;

const { subscriptionsPortal } = require('./helper/subcriptionPortal');
const { verifyTwitchSignature } = require('./helper/verifyTwitchSignature')

const { wakeDyno } = require('heroku-keep-awake');
const DYNO_URL = 'https://my-app.herokuapp.com';

app.use(Express.json({ verify: verifyTwitchSignature }));
app.post("/webhook/streamlive", (req, res) => {
	let challenge = req.body.challenge;
	res.status(200).send(challenge);
	console.log('Express: '.yellow + 'Posted challenge');
	testAnnounce.emit('stream-live');
});

const listener = app.listen(port, () => {
	const opts = { interval: 1 }
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
	const exampleEmbed =
		new Discord.MessageEmbed()
			.setTitle('Live on twitch')
			.setURL('https://www.twitch.tv/');

	const annouceChannel = client.channels.cache.get("863447077094031393");
	annouceChannel.send(exampleEmbed);
	console.log('testAnnouce: '.yellow + 'Announced\n');
});