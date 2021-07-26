module.exports = {
	registration:{
		data: {
			name: "give-role",
			description: "Give role to a specified user",
			options: [
				{
					name: "mention-username",
					description: "username of the user; to give the role to",
					required: true,
					type: 3
				},
				{
					name: "role",
					description: "the name of the role to be given",
					required: true,
					type: 3
				}
			]
		}
	},

	cmdName: "give-role",
	permissions: ["ADMINISTRATOR"],
	callback: async (client, interaction, args, replyTo) => {
		const { member } = interaction;

		// console.log(args);
		// console.log(interaction);

		const authorId = member.user.id;
		const guildId = interaction.guild_id;

		// check if mentions is used for username
		if (args["mention-username"].charAt(0) === "@" || args["mention-username"].charAt(2) === "&"){
			replyTo(interaction, `<@${member.user.id}>, Please use input a   **USER**   ಠ_ಠ`);
			return; 
		}
		if(args["mention-username"].charAt(2) !== "!") {
			replyTo(interaction, `<@${authorId}>, please use mentions; i.e. "@username"`);
			return;
		}

		// check if mentions is used for role
		if (args["role"].charAt(0) === "@" || args["role"].charAt(2) === "!"){
			replyTo(interaction, `<@${member.user.id}>, Please use input a   **ROLE**   ಠ_ಠ`);
			return; 
		}
		if(args["role"].charAt(2) !== "&") {
			replyTo(interaction, `<@${authorId}>, please use mentions; i.e. "@role"`);
			return;
		}

		// remove symbols
		let roleReceiverId;
		let assignedRoleId;
		roleReceiverId = args["mention-username"].match(/[0-9]/g).join().replace(/,/g, "");
		assignedRoleId = args["role"].match(/[0-9]/g).join().replace(/,/g, "");

		const guildData = await client.guilds.fetch(guildId);
		const memberData = await guildData.members.fetch(roleReceiverId).catch(()=>{});
		
		let guildRoleData; 
		let memberRoleData;
		try {
			// check roles is in guild
			guildRoleData = guildData.roles.cache.find(role => role.id === assignedRoleId);
			memberRoleData = memberData.roles.cache.find(role => role.id === assignedRoleId);
			// console.log(memberRoleData);
		} catch (error) { 
			replyTo(interaction, `<@${member.user.id}>, Please use input a   **USER**   ಠ_ಠ`);
			return; 
		}
		
		if(!guildRoleData){
			replyTo(interaction, `The "${args["role"]}" role does not exist in this server`);
			return;
		}

		// if receiver already has the role
		if(memberRoleData){
			replyTo(interaction, `<@${member.user.id}>, ${args["mention-username"]} already has the specified role.`);
			return;
		}

		// give the role
		try{
			await guildData.members.fetch(roleReceiverId).then(user => user.roles.add(guildRoleData.id));
			replyTo(interaction, `${args["mention-username"]} has given <@${member.user.id}> the "${args["role"]}" role`);
		}catch(err){
			replyTo(interaction, "Only can give roles with rank lower than admin :)");
			return;
		}
	}
};