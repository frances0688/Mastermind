var colors = [
	"red",
	"blue",
	"yellow",
	"green",
	"orange",
	"purple",
	"white",
	"black",
	"gold",
	"silver"
];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var difficultyLevel = 4;

var masterCode = [];

var userChoices = [];

$(document).ready(function() {
	masterCodeGenerator(difficultyLevel, colors);
});

function getRandom(items) {
	return Math.floor(Math.random() * items.length);
}

function numberOfChoices(difficultyLevel, items) {
	if (difficultyLevel <= 5) {
		return _.chunk(items, 6);
	} else if (difficultyLevel == 6 || difficultyLevel == 7) {
		return _.chunk(items, 8);
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
