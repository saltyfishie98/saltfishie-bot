/**
 * @brief look for a symbol in an arg then process it using the callbackfn
 * @param  symbol	symbol to find in the args
 * @param  argStr	args to be process
 * @param  callbackFn method to process the found data; not a pure function
 */
let addToString = false;
function lookForSymbol(symbol, argStr, callbackFn){
	if(argStr.charAt(0) === symbol) addToString = true;
	if(addToString){
		callbackFn();
	}
	if(argStr.charAt(argStr.length - 1) === symbol) addToString = false;
}

/**
 * @brief split and classify the args into titleDesc("title" & "desc") and properties
 * @param args
 * @returns {object} titleDesc, props
 */
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

		// look for data in between double quotes then concatenate 
		// into tempString (with no space at the start)
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
	// then reinsert the tempstring into the original args array 
	// with the pre-concatenated elements removed
	args.splice(startSplice, spliceCount, tempString);

	// take the first element (previous operation ensures args between quote are in a element)
	// then split at " " into titleDesc array
	let titleDesc = args[0].split("\" \"");
	for(let i=0; i<titleDesc.length; i++){
		titleDesc[i] = titleDesc[i].replace(/"/g, "");
	}
	
	// run this if there are remaining args after previous ops. ie. 
	// the optional args are specified
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
			props[i] = props[i].replace(/\|/g, "");
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
	}
	return { titleDesc, props };
}

module.exports = {
	commands: ["embed"],
	shortDesc: "Create a message embed",
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

	callback: async (message, args, text) =>{
		let embedMessage;

		// Obtain the classification of data in the args array
		let argsObj = await classifyMessage(args);

		// When no optional properties specified in the args array
		if(argsObj.props === null){

			// Format the outEmbed message
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

			// allocate the optional properties
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

			// Format the outEmbed message
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
		}).then(() => message.delete()).catch(() => {});
	}
};