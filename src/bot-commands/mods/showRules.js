const { guildChannelList } = require("../../helper/channelList");

const embedMessage = {
	color: 3447003,
	title: "**Welcome to the Benangz discord server**",
	description: "**The Rules of The Server**",
	fields: [
		{ name: "\u200B", value: "\u200B" },
		{
			name: "Don't Be a Dick :)",
			value: "-> No spamming\n-> Respect each other"
		},
		{ name: "\u200B", value: "\u200B" },
		{
			name: "Use this link to invite",
			value: "Link: https://discord.gg/8xnrGJtkjz"
		},
		
		{ name: "\u200B", value: "\u200B" },
		{
			name: "**By reacting to this message, you have agreed to the rules of this server**",
			value: "Note: the react is required to officially join this server :P"
		}
	],
};

module.exports = {
	commands: ["showRules", "showRule", "showrule", "showrules"],
	expectedArgs: "",
	minArgs: 0,
	maxArgs: 0,
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (message, args, text) =>{

		for(const channel of guildChannelList){
			if(message.guild.id !== channel.guildId) continue;
			if(message.channel.id === channel.channelId){
				let fetched = await message.channel.messages.fetch({ limit: 5 });
				message.channel.bulkDelete(fetched);	
				message.channel.send({
					embed: embedMessage
				});
			} else {
				message.reply("can't be used in this channel");
			}
		}
	}
};