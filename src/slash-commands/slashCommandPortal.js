const configJson = require("../helper/config/config.json");

const benGuildId = configJson.benGuildId;
async function sCommandPortal(client, commandOptions){

	let {
		registration
	} = commandOptions;

	function testSlashCmdPortal(guildId){
		const app = client.api.applications(client.user.id);
		if(guildId){
			app.guilds(benGuildId);
		}
		return app;
	}

	await testSlashCmdPortal().commands.post(registration);

	const sCommands = await testSlashCmdPortal(benGuildId).commands.get();
	if(sCommands) console.log(`slash command "${registration.data.name}" added!`);
}


const path = require("path");
const fs = require("fs");

async function registerSlashCommands(client){
	function readCommands(dir){
		const files = fs.readdirSync(path.join(__dirname, dir));

		for(const file of files){
			const stat = fs.lstatSync(path.join(__dirname, dir, file));
			
			if(stat.isDirectory()){
				readCommands(path.join(dir, file));
			} else if(file !== "index.js" && file !== "slashCommandPortal.js") {
				const option = require(path.join(__dirname, dir, file));
				
				sCommandPortal(client, option);
			}
		}
	}
	readCommands("../slash-commands");
}

module.exports = { sCommandPortal, registerSlashCommands };