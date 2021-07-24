const { guildChannelList } = require("../../helper/channelList");

const embedMessage = {
	color: 3447003,
	title: "By reacting to this message, you have agreed to the rules of this server"
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