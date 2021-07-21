function verifyUser(client) {
	client.on("raw", event => {
		if(event.t === "MESSAGE_REACTION_ADD" && event.d.channel_id === "866630865583603712"){
			let guild = client.guilds.cache.get(event.d.guild_id);
	
			if(!event.d.member.roles.includes("866631071016943626")){
				guild.members.fetch(event.d.user_id).then(user => user.roles.add("866631071016943626"));
			} else {
				console.log("ady a new member");
			}
		}
	});
}

module.exports = { verifyUser };