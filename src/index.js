const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////////////////////////////////////////////////////////////
const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const twitchBroadcastId = process.env.TWITCH_BROADCASTER_ID;
const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN;
const twitchClientId = process.env.TWITCH_CLIENT_ID;

const benTwitchSigningSecret = process.env.BEN_TWITCH_SIGNING_SECRET;
const benTwitchBroadcastId = process.env.BEN_TWITCH_BROADCASTER_ID;
const benTwitchAccessToken = process.env.BEN_TWITCH_ACCESS_TOKEN;
const benTwitchClientId = process.env.BEN_TWITCH_CLIENT_ID;

const { subscriptionsPortal } = require("./helper/subcriptionPortal")
const { runServer } = require("./helper/expressServer");
const { runBot } = require("./helper/bot")

const myPortal = new subscriptionsPortal(
	twitchAccessToken, twitchClientId, twitchBroadcastId, twitchSigningSecret
);
// myPortal.revokeAccessToken();
// myPortal.queryAccessToken();
// myPortal.subscription('query');
// myPortal.subscription("delete", "cf90930c-5ba6-464d-aad0-e3c4f5808ad2");
// myPortal.subscription("create", "https://66ecb6590d8c.ngrok.io/webhook/streamup");

const benPortal = new subscriptionsPortal(
	benTwitchAccessToken, benTwitchClientId, benTwitchBroadcastId, benTwitchSigningSecret
);
// benPortal.queryAccessToken();
// benPortal.subscription('query');
// benPortal.subscription("delete", "");
// benPortal.subscription("create", "https://66ecb6590d8c.ngrok.io/webhook/streamup");

const signingSecretArry = [
	benPortal.twitchSigningSecret,
	myPortal.twitchSigningSecret
]

runServer(signingSecretArry);
runBot()

///////////////////////////////////////////////////////////////////////////////////////