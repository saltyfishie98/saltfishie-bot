const { guildChannelList } = require("../../helper/config/verifyUserConfig");
const { embedMessages } =require("../../helper/config/showRuleConfig");

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

				// delete previous message
				let fetched = await message.channel.messages.fetch({ limit: 5 });
				message.channel.bulkDelete(fetched);	

				// search through the embedMessages array 
				// for the message for the specific channel
				// and then send
				for(const embedMsg of embedMessages){
					if(embedMsg.channel === message.channel.id){
						message.channel.send({
							embed: embedMsg.message
						});
						return;
					}
				}
				message.channel.send("This is the rules");
				return;
			}
		}
		message.reply("can't be used in this channel");
	}
};