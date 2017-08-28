var colors = [
	"red",
	"blue",
	"yellow",
	"green",
	"orange",
	"purple",
	"magenta",
	"cyan",
	"white",
	"black"
];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var cats = [
	"cat1",
	"cat2",
	"cat3",
	"cat4",
	"cat5",
	"cat6",
	"cat7",
	"cat8",
	"cat9",
	"cat10"
];

var difficultyLevel = 4;

var masterCode = [];

var userChoices = [];

// Default game status
$(document).ready(function() {
	masterCodeGenerator(difficultyLevel, colors);
});

function getRandom(items) {
	return Math.floor(Math.random() * items.length);
}

// Increased difficulty level will increase the number of items to choose from in the array
function numberOfChoices(difficultyLevel, items) {
	if (difficultyLevel <= 5) {
		return _.chunk(items, 6)[0];
	} else if (difficultyLevel == 6 || difficultyLevel == 7) {
		return _.chunk(items, 8)[0];
	} else {
		return items;
	}
}

function masterCodeGenerator(difficultyLevel, items) {
	masterCode = [];
	items = numberOfChoices(difficultyLevel, items);
	for (i = 0; i < difficultyLevel; i++) {
		masterCode.push(items[getRandom(items)]);
	}
}

// Compare each item in user choices with the generated master code
function compareCodes(masterCode, userChoices) {
	var pegs = [];
	var masterIndex;
	for (i = 0; i < difficultyLevel; i++) {
		masterIndex = _.indexOf(masterCode, userChoices[i]);
		if (masterIndex == i) {
			pegs.push("blackPeg");
		} else if (masterIndex > -1) {
			pegs.push("whitePeg");
		} else {
			pegs.push(null);
		}
	}
	return _.shuffle(pegs);
}

// Testing win conditions: after comparing codes, receive an array of all black pegs
function winGame(masterCode, userChoices) {
	var allBlack = _.uniq(compareCodes(masterCode, userChoices));
	if (allBlack.length === 1 && allBlack[0] == "blackPeg") {
		console.log("You Won, betch!");
	}
}
