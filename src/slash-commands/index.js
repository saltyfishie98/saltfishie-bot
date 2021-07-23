const Discord = require("discord.js");

async function enableSlashCommands(client){
	// const benGuildId = "845682082306064404";
	// function testSlashCmdPortal(guildId){
	// 	const app = client.api.applications(client.user.id);
	// 	if(guildId){
	// 		app.guilds(benGuildId);
	// 	}
	// 	return app;
	// }

	// await testSlashCmdPortal(benGuildId).commands.post({
	// 	data: {
	// 		name: "ping",
	// 		description: "a simple ping command"
	// 	}
	// });

	// await testSlashCmdPortal(benGuildId).commands.post({
	// 	data: {
	// 		name: "embed",
	// 		description: "Displays an embed",
	// 		options: [
	// 			{
	// 				name: "title",
	// 				description: "Title of the embed",
	// 				required: true,
	// 				type: 3
	// 			}, 
	// 			{
	// 				name: "description",
	// 				description: "Description of the embed",
	// 				required: true,
	// 				type: 3
	// 			},
	// 			{
	// 				name: "show_user",
	// 				description: "Boolean; show author name",
	// 				type: 5
	// 			},
	// 			{
	// 				name: "url",
	// 				description: "Url used in this embed",
	// 				type: 3
	// 			},
	// 			{
	// 				name: "color",
	// 				description: "Color of the embed",
	// 				type: 4
	// 			},
	// 			{
	// 				name: "thumbnail_url",
	// 				description: "Url to thumbnail used in the imbed",
	// 				type: 3
	// 			},
	// 			{
	// 				name: "image_url",
	// 				description: "Url to image used in the imbed",
	// 				type: 3
	// 			},
	// 			{
	// 				name: "show_timestamp",
	// 				description: "Boolean; show timestamp",
	// 				type: 5
	// 			},
	// 		]
	// 	}
	// });
	// await testSlashCmdPortal(benGuildId).commands("868072323427762207").delete();

	// const sCommands = await testSlashCmdPortal(benGuildId).commands.get();
	// console.log(sCommands);
		
	async function createApiMsg(interaction, content){
		const { data, files } = await Discord.APIMessage.create(
			client.channels.resolve(interaction.channel_id), content
		).resolveData().resolveFiles();
	
		return { ...data, files };
	}
	
	async function replyTo(interaction, response){
		let data = {
			content: response
		};
	
		if(typeof response === "object"){
			data = await createApiMsg(interaction, response);
		}
	
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data
			}
		});
	}

	///////////////////////////////////////////////////////////////////////////////////////
	client.ws.on("INTERACTION_CREATE", async (interaction) => {
		// console.log(interaction);
		const { name, options } = interaction.data;
		const inCommand = name.toLowerCase();

		const args = {};
		if(options){
			console.log(options);
			for(const option of options){
				const { name, value } = option;
				args[name] = value;
			}
			console.log(args);
		}
		// console.log(args);

		let embedMsg = new Discord.MessageEmbed();
		const user = await client.user.fetch(interaction.member.user.id);
		switch (inCommand) {
			case "ping":
				replyTo(interaction, "pong");
				break;

			case "embed":
				embedMsg.setTitle(args["title"])
					.setDescription(args["description"])
					.setURL(args["url"])
					.setColor(args["color"])
					.setThumbnail(args["thumbnail_url"])
					.setImage(args["image_url"]);

				if(args["show_name"] === true){
					embedMsg.setAuthor(
						`${interaction.member.user.username}`, 
						`${user.displayAvatarURL()}`
					);
				}

				if(args["show_timestamp"] === true){
					embedMsg.timestamp = new Date();
				}
				
				console.log(embedMsg);

				replyTo(interaction, embedMsg);
				break;
		
			default:
				break;
		}
	});
}

module.exports = { enableSlashCommands };