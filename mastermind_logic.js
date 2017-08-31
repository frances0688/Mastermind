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
	document.getElementById("checkBtn").disabled = true;
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
	var checked = masterCode.map(function(code) {
		return { code: code, checked: false };
	});

	// Check black pegs first
	userChoices.forEach(function(choice, index) {
		if (masterCode[index] === choice) {
			pegs.push("blackPeg");
			checked[index].checked = true;
		}
	});

	// Check the remaining codes for white pegs;
	userChoices.forEach(function(choice, index) {
		if (checked[index].checked) {
			return;
		}

		if (containsUniqueChoice(checked, choice)) {
			pegs.push("whitePeg");
		} else {
			pegs.push(null);
		}
	});

	return _.shuffle(pegs);
}

function containsUniqueChoice(checked, choice) {
	var unchecked = _.filter(checked, { checked: false });
	var matchedChoice = _.find(unchecked, { code: choice });

	if (matchedChoice) {
		matchedChoice.checked = true;
	}

	return !!matchedChoice;
}

// Testing win conditions: after comparing codes, receive an array of all black pegs
function winGame(masterCode, userChoices) {
	var allBlack = _.uniq(compareCodes(masterCode, userChoices));
	if (allBlack.length === 1 && allBlack[0] == "blackPeg") {
		alert("You Won, betch!");
	}
}
