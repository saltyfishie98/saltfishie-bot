const { suggestionPollListener } = require("../suggestions/suggestionPollListener");

// list of channels where it listen to
const autoReactChannelList = [
	"845682082750922788", // ben-discord-suggestion
	"868907390752399370" 	// ben-twitch-suggestion
];

function runSuggestionPollListener(client){
	suggestionPollListener(client, autoReactChannelList[0], "870744348982145055", 10); // ben-discord
	suggestionPollListener(client, autoReactChannelList[1], "870744348982145055", 10); // ben-twitch
}

module.exports = { autoReactChannelList, runSuggestionPollListener };