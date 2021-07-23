const config = require("../config.json");

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

let availableCommands = [];
function botCommand(client, commandOptions){
	let {
		commands,
		expectedArgs = "",
		permissionError = "you do not have the permission to run this command",
		minArgs = 0,
		maxArgs = null,
		permissions = [],
		requiredRoles = [],
		callback
	} = commandOptions;

	if(typeof commands === "string"){
		commands = [commands];
	}
	console.log(`adding command "${commands[0]}"`);
	availableCommands.push(commands[0]);

	if(permissions.length){
		if(typeof permissions === "string"){
			permissions = [permissions];
		}
		validatePermission(permissions);
	}

	client.on("message", message => {
		if(message.author.bot) return;

		const { member, content, guild } = message;

		for (const alias of commands){
			if(content.toLowerCase().startsWith(`${config.prefix}${alias.toLowerCase()}`)){
				
				for(const permission of permissions){
					if(!member.hasPermission(permission)){
						message.reply(permissionError);
						return;
					}
				}

				for(const requiredRole of requiredRoles){
					let guildHas = false;
					let memberHas = false;

					guildHas = guild.roles.cache.find(role => role.name.toLowerCase() === requiredRole.toLowerCase());
					memberHas = member.roles.cache.find(role => role.name.toLowerCase() === requiredRole.toLowerCase());

					if(!guildHas || !memberHas){
						message.reply(`You must have the "${requiredRole}" role to use this command.`);
						return;
					}
				}

				const args = content.split(/[ ]+/);
				args.shift();

				if(args.length < minArgs || (maxArgs !== null && args.length > maxArgs)){
					message.reply({
						embed: expectedArgs
					});
					return;
				}

				callback(message, args, args.join(" "));

				return;
			}
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");

function enableBotCommands(client){
	const readCommands = dir => {
		const files = fs.readdirSync(path.join(__dirname, dir));

		for(const file of files){
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			
			if(stat.isDirectory()){
				readCommands(path.join(dir, file));
			} else if(file !== "index.js") {
				const option = require(path.join(__dirname, dir, file));
				botCommand(client, option);
			}
		}
	};
	readCommands("../bot-commands");

	///////////////////////////////////////////////////////////////////////////////////
	let embedMsg = new Discord.MessageEmbed();
	const showCommands = (dir) => {
		embedMsg.setTitle("Available Commands");

		const files = fs.readdirSync(path.join(__dirname, dir));

		for(const file of files){
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			
			if(stat.isDirectory()){
				showCommands(path.join(dir, file));
			} else if(file !== "index.js" && file !== "showRules.js") {
				const option = require(path.join(__dirname, dir, file));
				embedMsg.addField(option.commands[0], option.shortDesc || "unspecified");
				console.log(embedMsg);
			}
		}
		console.log(embedMsg);
		return embedMsg;
	};
	
	let first = true;
	let outParam;
	client.on("message", message => {
		const validCommands = [
			"cmd",
			"cmds",
			"commands",
			"command"
		];

		let msgIsValid = false;
		for(let command of validCommands){
			if(message.content === `${config.prefix}${command}`){
				msgIsValid = true;
			}
		}

		if(msgIsValid){
			if(first) {
				outParam = showCommands("../bot-commands");
				first = false;
			}
			message.reply(outParam);
		}
	});
}

module.exports = { enableBotCommands };