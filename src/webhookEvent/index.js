const { Stream, announcer } = require("./eventType");

const test = false;

const MyStream = new Stream("saltyfishie98", process.env.TWITCH_BROADCASTER_ID);
MyStream.setStreamUpEventId("my-streamup");
MyStream.setStreamChangeEventId("my-streamchange");

const BenStream = new Stream("benangz", process.env.BEN_TWITCH_BROADCASTER_ID);
BenStream.setStreamUpEventId("ben-streamup");
BenStream.setStreamChangeEventId("ben-streamchange");

module.exports = (reqBody) => {
	switch (reqBody.subscription.type) {
		case "stream.online":
			if(test) announcer.emit("test-streamup");

			// MyStream.up(reqBody);
			BenStream.up(reqBody);
			break;

		case "channel.update":
			if(test) announcer.emit("test-streamup");

			// MyStream.change(reqBody);
			BenStream.change(reqBody);
			break;
	}
};