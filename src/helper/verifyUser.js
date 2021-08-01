/* 
	give specified role (see verifyUserConfig.js) 
	to the user that react in the channel 
*/

const { guildChannelList } = require("./config/verifyUserConfig");

function verifyUser(client) {
	client.on("raw", async (eventData) => {
		if(eventData.t === "MESSAGE_REACTION_ADD"){

			// check the reaction channel is in the channelList
			for(const channel of guildChannelList){
				if(eventData.d.guild_id !== channel.guildId) continue;
				if(eventData.d.channel_id !== channel.channelId) continue;
					
				let guildData = await client.guilds.fetch(eventData.d.guild_id);
				let roleData = guildData.roles.cache.find(
					role => role.name.toLowerCase() === channel.roleName.toLowerCase()
				);
				if(roleData){
					const memberData = guildData.members.fetch(eventData.d.user_id);
					if(!eventData.d.member.roles.includes(roleData.id)){
						memberData.then(user => user.roles.add(roleData.id)).catch((err)=>{console.log(err);});
					} else {
						(await client.users.fetch(eventData.d.user_id)).send(`Hi, you are already a ${channel.roleName} :)`);
					}
				} else {
					(await client.channels.fetch(eventData.d.channel_id)).send(`Missing ${channel.roleName} role; please make one to use this feature`);
				}
			}
		}
	});
}

module.exports = { verifyUser };