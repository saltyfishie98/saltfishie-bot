const dotenv = require("dotenv");
dotenv.config();

const Events = require("events");
const announcer = new Events();

const { myPortal } = require("../helper/subcriptionPortal");

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
		if (i > myData.data.data.length) throw new Error("can't find id");
		i++;
	}
}

class Stream {
	constructor(channelName, broadcasterId) {
		this._channelName = channelName;
		this._broadcasterId = broadcasterId;
		this._streamChangeId = null;
		this._streamupId = null;
	}

	setStreamUpEventId(eventId) {
		this._streamupId = eventId;
	}

	setStreamChangeEventId(eventId) {
		this._streamChangeId = eventId;
	}

	up(reqBody) {
		if (this._streamupId !== null) {
			if (reqBody.event.broadcaster_user_id === this._broadcasterId) {
				announcer.emit(`${this._streamupId}`);
			}
		} else if (this._streamupId === null) {
			console.log("Warning: Stream::up: streamupId not set");
		} 
	}

	change(reqBody) {
		if (this._streamChangeId !== null) {
			if (reqBody.event.broadcaster_user_id === this._broadcasterId) {
				toEmitStreamChange(
					this._channelName,
					this._broadcasterId,
					this._streamChangeId
				);
			}
		} else if (this._streamChangeId === null) {
			console.log("Warning: Stream::change: streamChangeId not set");

		}
	}
}

module.exports = {
	announcer,
	Stream,
};
