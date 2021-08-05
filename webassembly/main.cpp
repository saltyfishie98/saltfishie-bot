#include <iostream>
#include <stdlib.h>
#include <random>
#include <chrono>
#include <vector>

#include <emscripten/bind.h>

auto genRandomNum(int max) {
	std::mt19937 rng(std::chrono::steady_clock::now().time_since_epoch().count());
	return rng() % max;
}

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

int main() {
	std::cout << "test: genRandomNum = " << genRandomNum(10) << "\n";
	std::cout << "test: response8Ball = " << response8Ball() << "\n";
}

EMSCRIPTEN_BINDINGS(my_module) {
	emscripten::function("genRandomNum", &genRandomNum);
	emscripten::function("response8Ball", &response8Ball);
}
