const configJson = require("../helper/config/config.json");

const benGuildId = configJson.benGuildId;
async function sCommandPortal(client){
	function testSlashCmdPortal(guildId){
		const app = client.api.applications(client.user.id);
		if(guildId){
			app.guilds(benGuildId);
		}
		return app;
	}


	// testSlashCmdPortal(benGuildId).commands.post({
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

	await testSlashCmdPortal(benGuildId).commands("868072323427762207").delete();

	const sCommands = await testSlashCmdPortal(benGuildId).commands.get();
	console.log(sCommands);
}

module.exports = { sCommandPortal };