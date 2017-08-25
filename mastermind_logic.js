var colorsArray = ["red", "blue", "yellow", "green", "orange", "purple"];

var difficultyLevel;

var userArray = [];

function getRandomColor(array) {
	return Math.floor(Math.random() * array.length);
}

function masterCodeGenerator(difficultyLevel, array) {
	var masterCode = [];
	for (i = 0; i < difficultyLevel; i++) {
		code.push(array[getRandomColor(array)]);
	}
	return masterCode;
}
