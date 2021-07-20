const dotenv = require("dotenv");
dotenv.config();

const Events = require("events");
const announcer = new Events();

// Streamup
///////////////////////////////////////////////////////////////////////////////////////
function streamup(reqBody) {
	switch (reqBody.event.broadcaster_user_id) {
		case `${process.env.TWITCH_BROADCASTER_ID}`:
			announcer.emit("my-streamup");
			break;

		case `${process.env.BEN_TWITCH_BROADCASTER_ID}`:
			announcer.emit("ben-streamup");
			break;

		default:
			announcer.emit("ben-streamup");
			announcer.emit("my-streamup");
			announcer.emit("test-streamup");
			break;
	}
}


// Stream-change
///////////////////////////////////////////////////////////////////////////////////////
async function toEmitStreamChange(channelName, broadcasterId, eventId) {
	let myData = await myPortal.searchChannelInfo(channelName);

	let found = false;
	let i = 0;
	while (!found) {
		if (myData.data.data[i].id === broadcasterId) {
			let param = myData.data.data[i];
			if (param.is_live) {
				announcer.emit(eventId, `${param.game_name}`, `${param.title}`);
				console.log(`Annoucer: emitted ${eventId}`);
			}
			found = true;
		}
		if (i > myData.data.data.length) throw new error("can't find id");
		i++;
	}
}

function streamChange(reqBody) {
	switch (reqBody.event.broadcaster_user_id) {
		case `${process.env.TWITCH_BROADCASTER_ID}`:
			toEmitStreamChange(
				"saltyfishie98",
				process.env.TWITCH_BROADCASTER_ID,
				"my-streamchange"
			);
			break;

		case `${process.env.BEN_TWITCH_BROADCASTER_ID}`:
			toEmitStreamChange(
				"benangz",
				process.env.BEN_TWITCH_BROADCASTER_ID,
				"ben-streamchange"
			);
			break;

		default:
			toEmitStreamChange
				("saltyfishie98", process.env.TWITCH_BROADCASTER_ID, "my-streamchange");
			toEmitStreamChange
				("benangz", process.env.BEN_TWITCH_BROADCASTER_ID, "ben-streamchange");
			announcer.emit("test-streamchange");
			break;
	}
}
///////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	streamup,
	streamChange,
	announcer,
};
