const dotenv = require('dotenv');
dotenv.config();

const Express = require('express');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const app = Express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("hello world");
});

const listener = app.listen(port, () => {
	console.log("Your app is listening on port " + listener.address().port);
});

const Client = new Discord.Client();
Client.on('ready', () => {
	console.log('ready');
});

Client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		console.log(message);
		message.channel.send('Pong!');
	}

});

Client.login(process.env.TOKEN);