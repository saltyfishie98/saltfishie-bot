function suggestionPollListener(client, listenChannelId, receiveChannelId, treshold){
	client.on("raw", async (event) => {	
		if(event.t === "MESSAGE_REACTION_REMOVE" || event.t === "MESSAGE_REACTION_ADD"){
			
			if(event.d.guild_id === "845682082306064404" && event.d.channel_id === listenChannelId){
				const messageId = event.d.message_id;
				const channelData = await client.channels.fetch(listenChannelId);
				const messageData = await channelData.messages.fetch(messageId);
				const upCount = messageData.reactions.cache.get("👍").count;
				const downCount = messageData.reactions.cache.get("👎").count;
				
				const receiveChannel = await client.channels.fetch(receiveChannelId);
				// console.log(upCount - downCount);
	
				if(upCount - downCount >= treshold){
					const messageContent = messageData.content;
	
					const embedMessage = {
						author: {
							name: messageData.author.username,
							icon_url: messageData.author.displayAvatarURL()
						},
						title: `${messageData.channel.name} suggestion to review:`,
						description: messageContent
					};
	
					receiveChannel.send({ embed: embedMessage });
				}
			}
		}
	});
}

module.exports = { suggestionPollListener };