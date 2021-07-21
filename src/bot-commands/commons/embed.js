let addToString = false;
function lookForSymbol(symbol, argStr, callbackFn){
	if(argStr.charAt(0) === symbol) addToString = true;
	if(addToString){
		callbackFn();
	}
	if(argStr.charAt(argStr.length - 1) === symbol) addToString = false;
}

async function classifyMessage(args){
	let properties = {
		type: "",
		value: ""
	};
	let props = null;

	let firstStr = true;
	let tempString = "";
	let startSplice;
	let spliceCount = 1;
	for(let i = 0; i < args.length; i++){
		lookForSymbol("\"", args[i], () => {
			if(firstStr){
				tempString += args[i];
				startSplice = i;
				firstStr = false;
			} else {
				tempString += ` ${args[i]}`;
				spliceCount++;
			}
		});
	}		
	args.splice(startSplice, spliceCount, tempString);

	let titleDesc = args[0].split("\" \"");
	for(let i=0; i<titleDesc.length; i++){
		titleDesc[i] = titleDesc[i].replace(/"/g, "");
	}
	
	if(args.length > 1){
		let firstCmd = true;
		let tempCmd = "";
		let startSpliceCmd;
		let cmdSpliceCount = 1;
		for(let i = 0; i < args.length; i++){
			lookForSymbol("|", args[i], () => {
				if(firstCmd){
					tempCmd += args[i];
					startSpliceCmd = i;
					firstCmd = false;
				} else {
					tempCmd += ` ${args[i]}`;
					cmdSpliceCount++;
				}
			});
		}			
		args.splice(startSpliceCmd, cmdSpliceCount, tempCmd);

		props = args[1].split("| |");
		for(let i=0; i<props.length; i++){
			props[i] = props[i].replace("|", "");
		}
		for(let i=0; i<props.length; i++){
		// remove spaces then split type and value
			props[i] = props[i].replace(/[ ]+/g, "").split("->");

			// convert the array to properties object
			let temp = props[i];
			props[i] = Object.create(properties);
			props[i].type = temp[0];
			props[i].value = temp[1];
		}
		console.log(props);
	}
	return { titleDesc, props };
}

module.exports = {
	commands: ["embed"],
	expectedArgs: {
		title: "!embed",
		fields: [
			{
				name: "Syntax",
				value: "!embed \"<title>\" \"<description>\" |options->value|"
			},
			{	
				name: "Parameters",
				value: "title, description, ?url, ?imageUrl, ?color",
				inline: true
			},
			{	
				name: "‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎",
				value: "‎‏‏‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎‏‏**\"?\" denotes optional** ",
				inline: true
			},
			{
				name: "Example usage: ",
				value: "!embed \"title\" \"discription\" |url->url | |imageUrl->url | |color->[discord color code](https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812)|",
			}
		]
	},
	minArgs: 1,
	permissions: ["EMBED_LINKS"],
	requiredRoles: [],
	callback: async (message, args, text) =>{
		let argsObj = await classifyMessage(args);
		
		let embedMessage;
		if(argsObj.props === null){
			embedMessage = {
				author: {
					name: message.author.username,
					icon_url: message.author.displayAvatarURL()
				},
				color: 3447003,
				title: argsObj.titleDesc[0],
				description: argsObj.titleDesc[1],
			};
		} else {
			let imgUrl, colorVal, urlVal;

			for(let props of argsObj.props){
				switch (props.type) {
					case "imageUrl":
						imgUrl = props.value;
						break;

					case "color":
						colorVal = parseInt(props.value);
						break;

					case "url":
						urlVal = props.value;
						break; 
		
					default:
						message.reply(`!embed: ${props.type} is not a valid type`);
						break;
				}
			}

			embedMessage = {
				author: {
					name: message.author.username,
					icon_url: message.author.displayAvatarURL()
				},
				title: argsObj.titleDesc[0],
				url: urlVal,
				description: argsObj.titleDesc[1],
				color: colorVal,
				image: {
					url: imgUrl
				}
			};
		}

		message.channel.send({
			embed: embedMessage
		}).then(() => message.delete());
	}
};