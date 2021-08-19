#include <iostream>
#include <stdlib.h>
#include <random>
#include <chrono>
#include <vector>
#include <array>
#include <string>
#include <algorithm>
#include <iterator>

#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <emscripten.h>

//////////////////////////////////////////////////////////////////////////////////////////
auto genRandomNum(int max) {
	std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
	return rng() % max;
}

//////////////////////////////////////////////////////////////////////////////////////////
// clang-format off
const std::string responses[] = {
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes, definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook's good",
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful "
};
// clang-format on

std::string response8Ball() {
	return responses[genRandomNum(sizeof(responses) / sizeof(responses[0]))];
}

//////////////////////////////////////////////////////////////////////////////////////////
// bool checkPermissionsFor(std::string permission) {
// 	// clang-format off
// 	const std::string validPermissions[] = {
// 		"CREATE_INSTANT_INVITE",
// 		"KICK_MEMBERS",
// 		"BAN_MEMBERS",
// 		"ADMINISTRATOR",
// 		"MANAGE_CHANNELS",
// 		"MANAGE_GUILD",
// 		"ADD_REACTIONS",
// 		"VIEW_AUDIT_LOG",
// 		"PRIORITY_SPEAKER",
// 		"STREAM",
// 		"VIEW_CHANNEL",
// 		"SEND_MESSAGES",
// 		"SEND_TTS_MESSAGES",
// 		"MANAGE_MESSAGES",
// 		"EMBED_LINKS",
// 		"ATTACH_FILES",
// 		"READ_MESSAGE_HISTORY",
// 		"MENTION_EVERYONE",
// 		"USE_EXTERNAL_EMOJIS",
// 		"VIEW_GUILD_INSIGHTS",
// 		"CONNECT",
// 		"SPEAK",
// 		"MUTE_MEMBERS",
// 		"DEAFEN_MEMBERS",
// 		"MOVE_MEMBERS",
// 		"USE_VAD",
// 		"CHANGE_NICKNAME",
// 		"MANAGE_NICKNAMES",
// 		"MANAGE_ROLES",
// 		"MANAGE_WEBHOOKS",
// 		"MANAGE_EMOJIS",
// 		"USE_SLASH_COMMANDS",
// 		"REQUEST_TO_SPEAK",
// 		"MANAGE_THREADS",
// 		"USE_PUBLIC_THREADS",
// 		"USE_PRIVATE_THREADS"
// 	};
// 	// clang-format on

// 	auto index = std::find(std::begin(validPermissions), std::end(validPermissions), permission);
// 	if (index != std::end(validPermissions))
// 		return true;
// 	else
// 		return false;
// }

// void validatePermission(std::string* permissions, uint8_t size) {
// 	for (int i; i < size; i++) {
// 		std::cout << permissions[i] << "\n";
// 		if (!checkPermissionsFor(permissions[i])) {
// 			throw std::runtime_error("Unknown permission " + permissions[i]);
// 		}
// 	}
// }

//////////////////////////////////////////////////////////////////////////////////////////
extern "C" {
EMSCRIPTEN_KEEPALIVE
void fillArray(int* a, int len) {
	for (int i = 0; i < len; i++) {
		a[i] = i * i;
	}

	for (int j = 0; j < len; ++j) {
		printf("a[%d] = %d\n", j, a[j]);
	}
}
}
//////////////////////////////////////////////////////////////////////////////////////////

int main() {
	std::cout << "test: genRandomNum = " << genRandomNum(10) << "\n";
	std::cout << "test: response8Ball = " << response8Ball() << "\n";
}

//////////////////////////////////////////////////////////////////////////////////////////
EMSCRIPTEN_BINDINGS(my_module) {
	emscripten::function("genRandomNum", &genRandomNum);
	emscripten::function("response8Ball", &response8Ball);
}
