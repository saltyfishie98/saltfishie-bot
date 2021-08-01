
/**
 * @brief Automatically add "👍", "👎", and a spacer when a message is sent to the specific channel in the channelList (see file)
 */
async function suggestionAutoReact(client){
	
	// list of channels where it listen to
	const channelList = [
		"868907390752399370",
		"845682082750922788"
		// , "865609005136216075"
	];

	client.on("message", async message => {
		if(channelList.includes(message.channel.id) && !message.author.bot){
			await message.react("👍");
			message.react("👎");
			// await message.react("👌");
		}
	});
}

module.exports = { suggestionAutoReact };