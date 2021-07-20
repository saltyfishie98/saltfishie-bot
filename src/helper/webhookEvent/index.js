const { streamup, streamChange } = require("./eventType");

module.exports = (reqBody) => {
	switch (reqBody.subscription.type) {
		case "stream.online":
			streamup(reqBody);
			break;

		case "channel.update":
			streamChange(reqBody);
			break;
	}
};