async function suggestionAutoReact(client){
	const channelList = [
		"868907390752399370",
		"845682082750922788"
		// , "865609005136216075"
	];

	client.on("message", async message => {
		if(channelList.includes(message.channel.id) && !message.author.bot){
			message.channel.send("━━━━━━━━━━━━━━━━━━━━━━━━━━");

			await message.react("👍");
			message.react("👎");
			// await message.react("👌");
		}
	});
}

module.exports = { suggestionAutoReact };