const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');
dotenv.config();

const Client = new Discord.Client();
Client.once('ready', () => {
	console.log('ready');
});

Client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong!');
	}

});

Client.login(process.env.TOKEN);