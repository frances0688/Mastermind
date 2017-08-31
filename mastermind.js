// Variables
var insertPegFirstRow = true;
var checkBtn = document.getElementById("checkBtn");
var attempts = 1;
var colorPicked;
$(".space").addClass("blocked");
$('tr[row="' + attempts + '"] .space').removeClass("blocked");

//Expands game board according to difficulty level
$(".difficulty > button").click(function(event) {
	var futureLevel = parseInt(event.target.innerHTML);
	var newColumns = futureLevel - difficultyLevel;
	if (newColumns >= 0) {
		for (i = 0; i < newColumns; i++) {
			$("<td class='space'></td>").insertAfter(
				"#main-game > tbody > tr > td:nth-child(" + difficultyLevel + ")"
			);
			if (insertPegFirstRow) {
				$(".firstRowPeg").append('<div class = "pegspace"></div>');
				insertPegFirstRow = false;
			} else {
				$(".secondRowPeg").append('<div class = "pegspace"></div>');
				insertPegFirstRow = true;
			}
		}
	} else {
		for (i = newColumns; i < 0; i++) {
			$("#main-game > tbody > tr > td").remove(":nth-child(1)");
			if (insertPegFirstRow) {
				$(".secondRowPeg>div").remove(":nth-child(1)");
				insertPegFirstRow = false;
			} else {
				$(".firstRowPeg>div").remove(":nth-child(1)");
				insertPegFirstRow = true;
			}
		}
	}
	difficultyLevel = futureLevel;
});

// Expands amount of elements to choose from according to difficulty level
$(".next-level-btn").click(function() {
	$(".next-level").css("display", "inline");
	$(".last-level").css("display", "none");
});

$(".last-level-btn").click(function() {
	$(".next-level, .last-level").css("display", "inline");
});

$(".default-level-btn").click(function() {
	$(".next-level, .last-level").css("display", "none");
});

// Places choice in selected spot
var choice = $(".choices").each(function() {
	$(this).click(function() {
		var index = [$(this).index()];
		colorPicked = colors[index];
		console.log(colors[index]);
	});
});

$("td").on("click", function() {
	var element = $(this);
	var position = element.index();
	var row = element.parent();

	if (checkRigthRow(row.attr("row"))) {
		element.addClass("filled " + colorPicked);
		userChoices[position] = colorPicked;
		if (userChoices.length == difficultyLevel) {
			checkBtn.disabled = false;
		}
	} else {
		return;
	}
});

function checkRigthRow(rowNumber) {
	if (parseInt(rowNumber) === attempts) {
		return true;
	} else {
		return false;
	}
}

$("#checkBtn").click(function() {
	if (!gameOver()) {
		// Update current row
		$('tr[row="' + attempts + '"] .space').addClass("blocked");
		attempts++;
		$('tr[row="' + attempts + '"] .space').removeClass("blocked");

		// show Pegs
		drawPegs();
		winGame(masterCode, userChoices);
	}
});

function drawPegs() {
	var pegsArray = compareCodes(masterCode, userChoices);
	var pegSelector;
	var currentPegsRow = attempts - 1;
	var i;
	var i2 = 0;
	var blockname;
	pegsArray.forEach(function(pegColor, index) {
		i = index + 1;
		if (difficultyLevel % 2 === 0) {
			if (i <= difficultyLevel / 2) {
				blockname = ".firstRowPeg";
				pegSelector = $(
					'tr[row="' +
						currentPegsRow +
						'"] ' +
						blockname +
						" .pegspace:nth-child(" +
						i +
						")"
				);
			} else {
				i2++;
				blockname = ".secondRowPeg";
				pegSelector = $(
					'tr[row="' +
						currentPegsRow +
						'"] ' +
						blockname +
						" .pegspace:nth-child(" +
						i2 +
						")"
				);
			}
		}
		if (pegColor === "blackPeg") {
			pegSelector.css("background-image", "none").addClass("pegColorBlack");
		} else if (pegColor === "whitePeg") {
			pegSelector.css("background-image", "none").addClass("pegColorWhite");
		} else {
			return;
		}
	});
}

function gameOver() {
	if (attempts > 10) {
		if (confirm("GAME OVER! Want to play again?") == true) {
			window.location.reload();
			return;
		} else {
			return;
		}
	} else {
		return false;
	}
}

// MODE BUTTONS
// CLASSIC
$("#classic-btn").on("click", function() {
	window.location.reload();
});

// NUMBERS
$("#numbers-btn").on("click", function() {});

// CATS!
$("#cats-btn").on("click", function() {
	$(".classic").css("background-image", "url('img/grass.jpg')");
	$(".game-board").css("background-image", "url('img/fur.jpg')");
	$("html, .difficulty>button, #checkBtn").css("font-family", "Poiret One");
	$("html, .difficulty>button, #checkBtn").css("font-size", "35px");
	$(".choices").css("background-image", "url('img/cats-spritesheet.png')");
	$(".choices").css("background-size", "60px");
	$(".choices, .space").css("height", "60px");
	$(".choices, .space").css("width", "60px");
	$(".choices, .space").css("border-radius", 0);
	$(".space.red, #red-sphere").css("background-position-x", "0");
	$(".space.red, #red-sphere").css("background-position-y", "0");
	$(".space.blue, #blue-sphere").css("background-position-x", "0");
	$(".space.blue, #blue-sphere").css("background-position-y", "-65px");
	$(".space.yellow, #yellow-sphere").css("background-position-x", "0");
	$(".space.yellow, #yellow-sphere").css("background-position-y", "-133px");
	$(".space.green, #green-sphere").css("background-position-x", "0");
	$(".space.green, #green-sphere").css("background-position-y", "-193px");
	$(".space.orange, #orange-sphere").css("background-position-x", "0");
	$(".space.orange, #orange-sphere").css("background-position-y", "-636px");
	$(".space.purple, #purple-sphere").css("background-position-x", "0");
	$(".space.purple, #purple-sphere").css("background-position-y", "-372px");
	$(".space.magenta, #magenta-sphere").css("background-position-x", "0");
	$(".space.magenta, #magenta-sphere").css("background-position-y", "-439px");
	$(".space.cyan, #cyan-sphere").css("background-position-x", "0");
	$(".space.cyan, #cyan-sphere").css("background-position-y", "-507px");
	$(".space.white, #white-sphere").css("background-position-x", "0");
	$(".space.white, #white-sphere").css("background-position-y", "-573px");
	$(".space.black, #black-sphere").css("background-position-x", "0");
	$(".space.black, #black-sphere").css("background-position-y", "-259px");
});
