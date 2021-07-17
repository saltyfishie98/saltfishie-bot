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
const { runServer, announcer } = require("./helper/expressServer");
const { runBot } = require("./helper/bot")

// const registerSubUrl = "https://saltfishie-bot.herokuapp.com/webhook/streamup";

const myPortal = new subscriptionsPortal(
	twitchAccessToken, twitchClientId, twitchBroadcastId, twitchSigningSecret
);
// myPortal.queryAccessToken();
// myPortal.subscription('query');
// myPortal.subscription("delete", "");
// myPortal.subscription("create", registerSubUrl);

const benPortal = new subscriptionsPortal(
	benTwitchAccessToken, benTwitchClientId, benTwitchBroadcastId, benTwitchSigningSecret
);
// benPortal.queryAccessToken();
// benPortal.subscription('query');
// benPortal.subscription("delete", "");
// benPortal.subscription("create", registerSubUrl);

const signingSecretArry = [
	benPortal.twitchSigningSecret,
	myPortal.twitchSigningSecret
]

runServer(signingSecretArry);
runBot()

///////////////////////////////////////////////////////////////////////////////////////