const dotenv = require("dotenv");
dotenv.config();
// const configJson = require("./helper/config/config.json");

///////////////////////////////////////////////////////////////////////////////////////
const { 
	runServer,
	myPortal,
	benPortal,
	subscriptionsPortal
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
const { enableSlashCommands } = require("./slash-commands");
const { 
	verifyUser,
	suggestionAutoReact, 
	runSuggestionPollListener
} = require("./helper");


// const benGuildId = configJson.benGuildId;
client.on("ready", async () => {
	console.log("Discordjs: Ready!\n");
	verifyUser(client);
	enableBotCommands(client);
	enableSlashCommands(client);
	suggestionAutoReact(client);
	runSuggestionPollListener(client);
});

client.login(process.env.TOKEN);

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

// subscriptionsPortal.queryAccessToken(process.env.BEN_TWITCH_ACCESS_TOKEN);
// async function reqAcToken(){
// 	let d = await subscriptionsPortal.requestAccessToken(process.env.BEN_TWITCH_CLIENT_ID, process.env.BEN_TWITCH_CLIENT_SECRET);
// 	console.log(d);
// }
// reqAcToken();

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
// myPortal.subscription("query");
// myPortal.subscription("delete", "");
// myPortal.subscription("delete", "");
// myPortal.subscription("create", "https://4b69-2001-e68-541d-a9fc-a51e-8289-a99-80d3.ngrok.io/webhooks");
// myPortal.subscription("create", "https://4b69-2001-e68-541d-a9fc-a51e-8289-a99-80d3.ngrok.io/webhooks", "channel.update");
// myPortal.subscription("create", registerSubUrl);
// myPortal.subscription("create", registerSubUrl, "channel.update");

// benPortal.subscription("query");
// benPortal.subscription("delete", "");
// benPortal.subscription("delete", "");
// benPortal.subscription("create", "https://4b69-2001-e68-541d-a9fc-a51e-8289-a99-80d3.ngrok.io/webhooks");
// benPortal.subscription("create", "https://01360d3cab87.ngrok.io/webhooks", "channel.update");
// benPortal.subscription("create", registerSubUrl);
// benPortal.subscription("create", registerSubUrl, "channel.update");