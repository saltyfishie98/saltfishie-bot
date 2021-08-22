/* 
	list of channels where react to give role methods is enabled 
*/

const configJson = require("./config.json");

const guildChannelList = [
	{ guildId: `${configJson.benGuildId}`, channelId: "845682082750922783", roleName: "Seedling" }, // ben-server
	{ guildId: `${configJson.benGuildId}`, channelId: "870748145712234496", roleName: "Community Contributor" }, // ben-prior-notice
	
	{ guildId: `${configJson.myGuildId}`, channelId: "866630865583603712", roleName: "Seedling" }, // test-server
];

module.exports = { guildChannelList };