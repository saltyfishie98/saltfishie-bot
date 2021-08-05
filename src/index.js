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
const { 
	verifyUser,
	suggestionAutoReact, 
	suggestionPollListener
} = require("./helper");
// const { roleReaction } = require("./helper/roleReaction");
// const { firstMessage } = require("./helper/firstMessage");

// const benGuildId = "845682082306064404";
client.on("ready", async () => {
	console.log("Discordjs: Ready!\n");
	verifyUser(client);
	enableBotCommands(client);
	enableSlashCommands(client);
	suggestionAutoReact(client);
	suggestionPollListener(client, "845682082750922788", "870744348982145055", 10); // ben-discord
	suggestionPollListener(client, "868907390752399370", "870744348982145055", 10); // ben-twitch

	// let ticket = 0;
	// client.on("message", message => {
	// 	if(!message.author.bot){
	// 	}
	// });

	// client.api.applications(client.user.id).commands.post({
	// 	data: {
	// 		name: "8ball",
	// 		description: "A magic 8 ball",
	// 		options: [
	// 			{
	// 				name: "question",
	// 				description: "Questio to ask the 8ball",
	// 				required: true,
	// 				type: 3
	// 			}
	// 		]
	// 	}
	// });
	// client.api.applications(client.user.id).guilds(benGuildId).commands.post({
	// });
	
	// client.api.applications(client.user.id)
	// 	.commands("868220854914408498").delete();
	// client.api.applications(client.user.id)
	// 	.commands("868414944847204392").delete();
	// client.api.applications(client.user.id)
	// 	.commands("868415091249381376").delete();
	// client.api.applications(client.user.id)
	// 	.commands("868419481263800360").delete();
	// client.api.applications(client.user.id)
	// 	.commands("868467084085043201").delete();

	// const sCommands = await client.api.applications(client.user.id).guilds(benGuildId).commands.get();
	// const sCommands = await client.api.applications(client.user.id).commands.get();
	// console.log(sCommands);
});

// client.ws.on("INTERACTION_CREATE", async (interaction) => {
// 	console.log(interaction.data.options);
// });

client.login(process.env.TOKEN);

// client.on("raw", async (event) => {
// 	const upDownDiff = 1;
// 	const receiveChannelId = "865609005136216075";
// 	const listenChannelId = "845682082750922788";

// 	try{
// 		if(event.d.guild_id === "845682082306064404" && event.d.channel_id === listenChannelId){
// 			const messageId = event.d.message_id;
// 			const channelData = await client.channels.fetch(listenChannelId);
// 			const messageData = await channelData.messages.fetch(messageId);
// 			const upCount = messageData.reactions.cache.get("👍").count;
// 			const downCount = messageData.reactions.cache.get("👎").count;
			
// 			const receiveChannel = await client.channels.fetch(receiveChannelId);
// 			console.log(messageData.channel.name);

// 			if(upCount - downCount >= upDownDiff){
// 				const messageContent = messageData.content;

// 				const embedMessage = {
// 					author: {
// 						name: messageData.author.username,
// 						icon_url: messageData.author.displayAvatarURL()
// 					},
// 					title: `${messageData.channel.name} suggestion:`,
// 					description: messageContent
// 				};

// 				receiveChannel.send({ embed: embedMessage });
// 			}
// 		}
// 	}catch(err){console.log(err, "\n");}
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