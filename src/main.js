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

// subscriptionsPortal.queryAccessToken(process.env.TWITCH_ACCESS_TOKEN);
// subscriptionsPortal.revokeAccessToken(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_ACCESS_TOKEN);
// subscriptionsPortal.queryAccessToken(process.env.TWITCH_ACCESS_TOKEN);
// async function myreqAcToken(){
// 	let d = await subscriptionsPortal.requestAccessToken(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);
// 	console.log(d);
// }
// myreqAcToken();

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

// const registerSubUrl = "https://saltybottie.herokuapp.com/webhooks";
// myPortal.subscription("query");
// myPortal.subscription("delete", "");
// myPortal.subscription("delete", "");
// myPortal.subscription("create", registerSubUrl);
// myPortal.subscription("create", registerSubUrl, "channel.update");

// benPortal.subscription("query");
// benPortal.subscription("delete", "");
// benPortal.subscription("delete", "");
// benPortal.subscription("create", registerSubUrl);
// benPortal.subscription("create", registerSubUrl, "channel.update");