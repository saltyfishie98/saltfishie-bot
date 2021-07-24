module.exports = {
	cmdName: "give-role",
	permissions: ["ADMINISTRATOR"],
	requiredRoles: ["Admin"],
	callback: async (client, interaction, args, replyTo) => {
		const { member } = interaction;

		// console.log(args);
		// console.log(interaction);

		const authorId = member.user.id;
		const guildId = interaction.guild_id;

		// console.log(args);
		// check if mentions is used
		if(args["mention-username"].charAt(0) !== "<") {
			replyTo(interaction, `<@${authorId}>, please use mentions; i.e. "@username"`);
			return;
		}

		// remove symbols
		let roleReceiver;
		roleReceiver = args["mention-username"].match(/[0-9]/g).join().replace(/,/g, "");

		const guildData = await client.guilds.fetch(guildId);
		const memberData = await guildData.members.fetch(roleReceiver).catch(()=>{});
		
		let guildRoleData; 
		let memberRoleData;
		try {
			// check roles is in guild
			guildRoleData = guildData.roles.cache.find(role => role.name.toLowerCase() === args["role"]);
			memberRoleData = memberData.roles.cache.find(role => role.name.toLowerCase() === args["role"]);
		} catch (error) { 
			replyTo(interaction, `<@${member.user.id}>, Please use input a **USER**   ಠ_ಠ`);
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
		await guildData.members.fetch(roleReceiver).then(user => user.roles.add(guildRoleData.id));
		replyTo(interaction, `${args["mention-username"]} has given <@${member.user.id}> the "${args["role"]}" role`);
	}
};