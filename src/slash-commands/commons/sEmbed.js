const Discord = require("discord.js");

module.exports = {
	registration:{
		data: {
			name: "embed",
			description: "Displays an embed",
			options: [
				{
					name: "title",
					description: "Title of the embed",
					required: true,
					type: 3
				}, 
				{
					name: "description",
					description: "Description of the embed",
					required: true,
					type: 3
				},
				{
					name: "show_user",
					description: "Boolean; show author name",
					type: 5
				},
				{
					name: "url",
					description: "Url used in this embed",
					type: 3
				},
				{
					name: "color",
					description: "Color of the embed",
					type: 4
				},
				{
					name: "thumbnail_url",
					description: "Url to thumbnail used in the imbed",
					type: 3
				},
				{
					name: "image_url",
					description: "Url to image used in the imbed",
					type: 3
				},
				{
					name: "show_timestamp",
					description: "Boolean; show timestamp",
					type: 5
				},
			]
		}
	},

	cmdName: "embed",
	permissions: ["EMBED_LINKS"],
	callback: async (client, interaction, args, replyTo) => {
		const user = await client.user.fetch(interaction.member.user.id);
		let embedMsg = new Discord.MessageEmbed();

		embedMsg.setTitle(args["title"])
			.setDescription(args["description"])
			.setURL(args["url"])
			.setColor(args["color"])
			.setThumbnail(args["thumbnail_url"])
			.setImage(args["image_url"]);

		if(args["show_user"] === true){
			embedMsg.setAuthor(
				`${interaction.member.user.username}`, 
				`${user.displayAvatarURL()}`
			);
		}

		if(args["show_timestamp"] === true){
			embedMsg.timestamp = new Date();
		}
				
		// console.log(embedMsg);
		replyTo(interaction, embedMsg);
	}
};