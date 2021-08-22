
const { autoReactChannelList } = require("../config/runSuggestionPollListenerConfig");

/**
 * @brief Automatically add "👍", "👎", and a spacer when a message is sent to the specific channel in the channelList (see file)
 */
async function suggestionAutoReact(client){
	client.on("message", async message => {
		if(autoReactChannelList.includes(message.channel.id) && !message.author.bot){
			await message.react("👍");
			message.react("👎");
			// await message.react("👌");
		}
	});
}

module.exports = { suggestionAutoReact };