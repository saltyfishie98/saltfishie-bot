module.exports = async(client) => {
	client.on("messageReactionAdd", (reaction, user) => {
		if(reaction.message.channel.id === "866630865583603712"){
			reaction.message.channel.send("hi");				
		}
	});
};