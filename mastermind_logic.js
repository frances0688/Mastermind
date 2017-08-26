var colors = ["red", "blue", "yellow", "green", "orange", "purple"];

var difficultyLevel = 4;

var masterCode = [];

var userChoices = [];

$(document).ready(function() {
	masterCodeGenerator(difficultyLevel, colors);
});

function getRandomColor(items) {
	return Math.floor(Math.random() * items.length);
}

function masterCodeGenerator(difficultyLevel, items) {
	masterCode = [];
	for (i = 0; i < difficultyLevel; i++) {
		masterCode.push(items[getRandomColor(items)]);
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
