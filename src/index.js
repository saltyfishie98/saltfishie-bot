const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const { 
	runServer,
	myPortal,
	benPortal
} = require("./helper");

const signingSecretArry = [
	benPortal.twitchSigningSecret,
	myPortal.twitchSigningSecret
];

runServer(signingSecretArry);

///////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();

const { enableBotCommands } = require("./bot-commands");
const { verifyUser } = require("./helper");

client.login(process.env.TOKEN);

client.on("ready", () => {
	console.log("Discordjs: Ready!\n");
	enableBotCommands(client);
	verifyUser(client);
});

client.on("message", (message) => {
});

///////////////////////////////////////////////////////////////////////////////////////
const { 
	announceMyStreamChange,
	announceBenStreamChange,
	announceTestStreamchange 
} = require("./webhookEvent/stream-change");

const {
	announceMyStreamup,
	announceBenStreamup,
	announceTestStreamup
} = require("./webhookEvent/streamup");

announceBenStreamup(client);
announceMyStreamup(client);
announceTestStreamup(client);

announceTestStreamchange(client);
announceMyStreamChange(client);
announceBenStreamChange(client);

///////////////////////////////////////////////////////////////////////////////////////
// async function checkChannelData() {
// 	let res = await (benPortal.queryChannelInfo());
// 	console.log(res.data);
// }
// checkChannelData()

// async function searchChannelData() {
// 	let res = await (benPortal.searchChannelInfo());
// 	console.log(res.data);
// 	console.log(res.data.data.length);
// }
// searchChannelData()

// const registerSubUrl = "https://saltfishie-bot.herokuapp.com/webhooks";
// myPortal.queryAccessToken();
// myPortal.subscription("query");
// myPortal.subscription("delete", "");
// myPortal.subscription("delete", "");
// myPortal.subscription("create", "https://01360d3cab87.ngrok.io/webhooks");
// myPortal.subscription("create", "https://01360d3cab87.ngrok.io/webhooks", "channel.update");
// myPortal.subscription("create", registerSubUrl);
// myPortal.subscription("create", registerSubUrl, "channel.update");

// benPortal.queryAccessToken();
// benPortal.subscription("query");
// benPortal.subscription("delete", "");
// benPortal.subscription("delete", "");
// benPortal.subscription("create", "https://01360d3cab87.ngrok.io/webhooks");
// benPortal.subscription("create", "https://01360d3cab87.ngrok.io/webhooks", "channel.update");
// benPortal.subscription("create", registerSubUrl);
// benPortal.subscription("create", registerSubUrl, "channel.update");