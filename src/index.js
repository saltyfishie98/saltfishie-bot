const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const { runServer } = require("./helper/expressServer");
const { benPortal, myPortal } = require("./helper/subcriptionPortal");

const announceTestStreamup = require("./helper/webhookEvent/streamup/test-streamup");
const announceTestStreamchange = require("./helper/webhookEvent/stream-change/test-streamchange");

const { announceBenStreamup } = require("./helper/webhookEvent/streamup/ben-streamup");
const { announceBenStreamChange } = require("./helper/webhookEvent/stream-change/ben-streamchange");

const { announceMyStreamup } = require("./helper/webhookEvent/streamup/my-streamup");
const { announceMyStreamChange } = require("./helper/webhookEvent/stream-change/my-streamchange");

const signingSecretArry = [
	benPortal.twitchSigningSecret,
	myPortal.twitchSigningSecret
];

runServer(signingSecretArry);

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on("ready", () => {
	console.log("Discordjs: Ready!\n");
});

client.on("message", message => {
	if (message.content === "!ping") {
		message.channel.send("Pong!");
	}
});

///////////////////////////////////////////////////////////////////////////////////////
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

// const registerSubUrl = "https://saltfishie-bot.herokuapp.com/webhook/streamup";
// myPortal.queryAccessToken();
// myPortal.subscription('query');
// myPortal.subscription("delete", "");
// myPortal.subscription("delete", "");
// myPortal.subscription("create", "");
// myPortal.subscription("create", "", "channel.update");

// const registerSubUrl = "https://saltfishie-bot.herokuapp.com/webhook/streamup";
// benPortal.queryAccessToken();
// benPortal.subscription('query');
// benPortal.subscription("delete", "");
// benPortal.subscription("delete", "");
// benPortal.subscription("create", "");
// benPortal.subscription("create", "", "channel.update");