const fs = require("fs");
const config = require("../config.json");
  
let commandFiles = "";
let first = true;

module.exports = async (message, toIndex = false) => {
	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

	if(toIndex || first){
		commandFiles = fs.readdirSync(__dirname)
			.filter(file => file.endsWith(".js"));
		
		console.log(commandFiles);
		first = false;
	}
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!commandFiles.includes(`${command}.js`))
		return message.reply(`"!${command}" is an invalid command`);

	const runCommand = require(`./${command}`);
	runCommand(message, args);
};