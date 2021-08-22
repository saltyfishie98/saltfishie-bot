const Discord = require("discord.js");
const configJson = require("../helper/config/config.json");

// async function enableSlashCommands(client){
// const benGuildId = configJson.benGuildId;
// 	function testSlashCmdPortal(guildId){
// 		const app = client.api.applications(client.user.id);
// 		if(guildId){
// 			app.guilds(benGuildId);
// 		}
// 		return app;
// 	}

// await testSlashCmdPortal(benGuildId).commands.post({
// 	data: {
// 		name: "ping",
// 		description: "a simple ping command"
// 	}
// });

// await testSlashCmdPortal(benGuildId).commands.post({
// 	data: {
// 		name: "clear",
// 		description: "Clear specified amount of message",
// 		options: [
// 			{
// 				name: "amount",
// 				description: "Amount to clear",
// 				required: true,
// 				type: 3
// 			}
// 		]
// 	}
// });

// await testSlashCmdPortal(benGuildId).commands.post({
// 	data: {
// 		name: "embed",
// 		description: "Displays an embed",
// 		options: [
// 			{
// 				name: "title",
// 				description: "Title of the embed",
// 				required: true,
// 				type: 3
// 			}, 
// 			{
// 				name: "description",
// 				description: "Description of the embed",
// 				required: true,
// 				type: 3
// 			},
// 			{
// 				name: "show_user",
// 				description: "Boolean; show author name",
// 				type: 5
// 			},
// 			{
// 				name: "url",
// 				description: "Url used in this embed",
// 				type: 3
// 			},
// 			{
// 				name: "color",
// 				description: "Color of the embed",
// 				type: 4
// 			},
// 			{
// 				name: "thumbnail_url",
// 				description: "Url to thumbnail used in the imbed",
// 				type: 3
// 			},
// 			{
// 				name: "image_url",
// 				description: "Url to image used in the imbed",
// 				type: 3
// 			},
// 			{
// 				name: "show_timestamp",
// 				description: "Boolean; show timestamp",
// 				type: 5
// 			},
// 		]
// 	}
// });
// await testSlashCmdPortal(benGuildId).commands("868072323427762207").delete();

// const sCommands = await testSlashCmdPortal(benGuildId).commands.get();
// console.log(sCommands);

function validatePermission(permissions){
	const validPermissions = [
		"CREATE_INSTANT_INVITE", 
		"KICK_MEMBERS", 
		"BAN_MEMBERS", 
		"ADMINISTRATOR",
		"MANAGE_CHANNELS",
		"MANAGE_GUILD",
		"ADD_REACTIONS",
		"VIEW_AUDIT_LOG",
		"PRIORITY_SPEAKER",
		"STREAM",
		"VIEW_CHANNEL",
		"SEND_MESSAGES",
		"SEND_TTS_MESSAGES",
		"MANAGE_MESSAGES",
		"EMBED_LINKS",
		"ATTACH_FILES", 
		"READ_MESSAGE_HISTORY",
		"MENTION_EVERYONE",
		"USE_EXTERNAL_EMOJIS",
		"VIEW_GUILD_INSIGHTS",
		"CONNECT",
		"SPEAK",
		"MUTE_MEMBERS",
		"DEAFEN_MEMBERS",
		"MOVE_MEMBERS",
		"USE_VAD",
		"CHANGE_NICKNAME",
		"MANAGE_NICKNAMES",
		"MANAGE_ROLES",
		"MANAGE_WEBHOOKS",
		"MANAGE_EMOJIS",
		"USE_SLASH_COMMANDS",
		"REQUEST_TO_SPEAK",
		"MANAGE_THREADS",
		"USE_PUBLIC_THREADS",
		"USE_PRIVATE_THREADS"
	];

	for (const permission of permissions){
		if(!validPermissions.includes(permission)){
			throw new Error(`Unknown permission "${permission}"`);
		}
	}
}

async function slashCommands(client, commandOptions){
	async function createApiMsg(interaction, content){
		const { data, files } = await Discord.APIMessage.create(
			client.channels.resolve(interaction.channel_id), content
		).resolveData().resolveFiles();
	
		return { ...data, files };
	}
	
	async function replyTo(interaction, response){
		let data = {
			content: response
		};
	
		if(typeof response === "object"){
			data = await createApiMsg(interaction, response);
		}
	
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data
			}
		}).catch(() => {});
	}

	let {
		cmdName,
		permissionError = "you do not have the permission to run this command",
		permissions = [],
		requiredRoles = ["seedling"],
		callback
	} = commandOptions;

	console.log(`adding slash command "${cmdName}"`);

	if(permissions.length){
		if(typeof permissions === "string"){
			permissions = [permissions];
		}
		validatePermission(permissions);
	}

	client.ws.on("INTERACTION_CREATE", async (interaction) => {
		const { guild_id, member } = interaction;
		const guildData = await client.guilds.fetch(guild_id);
		const memberData = await guildData.members.fetch(member.user.id);

		const { name, options } = interaction.data;
		const args = {};
		if(options){
			// console.log(options);
			for(const option of options){
				const { name, value } = option;
				args[name] = value;
			}
			// console.log(args);
		}

		const inCommand = name.toLowerCase();
	
		if(cmdName === inCommand){
			// check permission
			// console.log(requiredRoles);
			for(const permission of permissions){
				if(!memberData.hasPermission(permission)){
					replyTo(interaction, permissionError);
					return;
				}
			}

			// check roles
			for(const requiredRole of requiredRoles){
				let guildHas = await guildData.roles.cache.find(
					role => role.name.toLowerCase() === requiredRole.toLowerCase()
				);

				let memberHas = await memberData.roles.cache.find(
					role => role.name.toLowerCase() === requiredRole.toLowerCase()
				);

				if(!guildHas || !memberHas){
					replyTo(interaction, 
						`You must have the "${requiredRole}" role to use this command.`);

					return;
				}
			}

			await callback(client, interaction, args, replyTo);
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const fs = require("fs");

async function enableSlashCommands(client){
	function readCommands(dir){
		const files = fs.readdirSync(path.join(__dirname, dir));

		for(const file of files){
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			
			if(stat.isDirectory()){
				readCommands(path.join(dir, file));
			} else if(file !== "index.js" && file !== "slashCommandPortal.js") {
				const option = require(path.join(__dirname, dir, file));
				
				slashCommands(client, option);
			}
		}
	}
	readCommands("../slash-commands");
}

module.exports = { enableSlashCommands };