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
const { enableSlashCommands } = require("./slash-commands");
const { verifyUser } = require("./helper");

const benGuildId = "845682082306064404";
client.on("ready", async () => {
	console.log("Discordjs: Ready!\n");
	verifyUser(client);
	enableBotCommands(client);
	enableSlashCommands(client);
	// client.user.fetch("335651941671763969").then(data => console.log(data.displayAvatarURL()));

	// client.api.applications(client.user.id).commands.post({
	// 	data: {
	// 		name: "give-role",
	// 		description: "Give role to a specified user",
	// 		options: [
	// 			{
	// 				name: "mention-username",
	// 				description: "username of the user; to give the role to",
	// 				required: true,
	// 				type: 3
	// 			},
	// 			{
	// 				name: "role",
	// 				description: "the name of the role to be given",
	// 				required: true,
	// 				type: 3
	// 			}
	// 		]
	// 	}
	// });
	// client.api.applications(client.user.id).guilds(benGuildId).commands.post({
	// });
	
	// client.api.applications(client.user.id).guilds(benGuildId)
	// 	.commands("868020488427946024").delete();

	// const sCommands = await client.api.applications(client.user.id).commands.get();
	// const sCommands = await client.api.applications(client.user.id).guilds(benGuildId).commands.get();
	// console.log(sCommands);
});

// client.ws.on("INTERACTION_CREATE", async (interaction) => {
// 	console.log(interaction.data.options);
// });

client.login(process.env.TOKEN);

// client.on("raw", async (event) => {
// 	if(event.t === "MESSAGE_REACTION_ADD"){
// 	}
// });

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