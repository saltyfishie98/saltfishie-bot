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

let allCommands = [];
let ran = false;
function botCommand(client, commandOptions){

	const requiredProps = {
		"commands": () => { return new Error("Unspecified command"); },
		"expectedArgs": "",
		"permissionError": "you do not have the permission to run this command",
		"minArgs": 0,
		"maxArgs": null,
		"permissions": [],
		"requiredRoles": [],
		"callback": new Error("Unspecified callback")
	};


	for(const properties in requiredProps){
		if(typeof commandOptions[properties] === "undefined")
			commandOptions[properties] = requiredProps[properties];
		
		if(typeof commandOptions.callback === "object"){
			console.log(commandOptions.callback);
		}

		// console.log(typeof commandOptions.commands);
		if(typeof commandOptions.commands === "function"){
			console.log(commandOptions.commands());
		}
	}

	if(typeof commandOptions.commands === "string"){
		commandOptions.commands = [commandOptions.commands];
	}

	for(let i = 0; i < commandOptions.commands.length; i++){
		commandOptions.commands[i] = commandOptions.commands[i].toLowerCase();
	}

	// console.log(commandOptions);
	if(typeof commandOptions.permissions === "string"){
		commandOptions.permissions = [commandOptions.permissions];
	}
	validatePermission(commandOptions.permissions);
	
	console.log(`adding command "${commandOptions.commands[0]}"`);

	// this is a bodge to fix "MaxListenersExceededWarning"
	allCommands.push(commandOptions);
	if(!ran){
		ran = true;
		client.on("message", message => {
			const { member, content, guild } = message;

			for(const cmd of allCommands){
				if(message.author.bot) return;

				// check args length
				const args = content.split(/[ ]+/);
				const inCommand = args[0].replace(`${config.prefix}`, "");
				args.shift();
				
				if(!cmd.commands.includes(inCommand.toLowerCase())) continue;			
				
				if(args.length < cmd.minArgs || (cmd.maxArgs !== null && args.length > cmd.maxArgs)){
					message.reply({
						embed: cmd.expectedArgs || { title: "unspecified" }
					});
					return;
				}
				
				// check permissions
				// console.log("Permissions ", cmd.permissions);
				for(const permission of cmd.permissions){
					if(!member.hasPermission(permission)){
						message.reply(cmd.permissionError);
						return;
					}
				}

				// check roles
				// console.log("roles ", cmd.requiredRoles);
				for(const requiredRole of cmd.requiredRoles){
					let guildHas = false;
					let memberHas = false;

					guildHas = guild.roles.cache.find(role => role.name.toLowerCase() === requiredRole.toLowerCase());
					memberHas = member.roles.cache.find(role => role.name.toLowerCase() === requiredRole.toLowerCase());

					if(!guildHas || !memberHas){
						message.reply(`You must have the "${requiredRole}" role to use this command.`);
						return;
					}
				}


				cmd.callback(message, args, args.join(" "));

				return;	
			}
		});
	}
}

///////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const { callback } = require("./commons/ping");
const { type } = require("os");

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

	const showCmdIgnoreList = [
		"index.js",
		"showRules.js"
	];

	const showCommands = (dir) => {
		embedMsg.setTitle(`Available Commands, Prefix: ${config.prefix}`);
		embedMsg.setFooter("Note: Some commands are also available as slash commands");

		const files = fs.readdirSync(path.join(__dirname, dir));

		for(const file of files){
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			
			if(stat.isDirectory()){
				showCommands(path.join(dir, file));
			} else if(!showCmdIgnoreList.includes(file)) {
				const option = require(path.join(__dirname, dir, file));
				embedMsg.addField(option.commands[0], option.shortDesc || "unspecified");
				// console.log(embedMsg);
			}
		}
		// console.log(embedMsg);
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
			message.channel.send({
				content: `<@${message.author.id}>`,
				embed: outParam
			}).then(() => message.delete()).catch(()=>{});
		}
	});
}

module.exports = { enableBotCommands };