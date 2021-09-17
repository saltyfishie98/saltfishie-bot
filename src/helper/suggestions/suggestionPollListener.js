/* 
	look like to dislike magnitude to see if passed treshold; if so add the suggestion to 
	review channel 
*/

const configJson = require("../config/config.json");

/**
 * @brief listen to specified suggestion channels for when a suggestion's like/dislike magnitude pass treshold
 * 
 * @param client client
 * @param listenChannelId Id of the channel to listen to
 * @param receiveChannelId Id of the channel to send a suggestion to when it passes treshold
 * @param treshold magnitude of the treshold 
 */
function suggestionPollListener(client, listenChannelId, receiveChannelId, treshold){
	client.on("raw", async (event) => {	
		if(event.t === "MESSAGE_REACTION_REMOVE" || event.t === "MESSAGE_REACTION_ADD"){
			try{
				if(event.d.guild_id === configJson.benGuildId && event.d.channel_id === listenChannelId){
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
			}catch(err){console.log(err);}
		}
	});
}

module.exports = { suggestionPollListener };