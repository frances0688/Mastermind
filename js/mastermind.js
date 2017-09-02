// Variables
var insertPegFirstRow = true;
var checkBtn;
var attempts = 1;
var selected;
var mode = "classic";
var choices = colors;

// Default game status
$(document).ready(function() {
	masterCodeGenerator(difficultyLevel, choices);
	checkBtn = document.getElementById("checkBtn");
	checkBtn.disabled = true;
	$(".space").on("click", setUserChoice);
	// Places choice in selected spot
	$(".choices").click(function() {
		var index = [$(this).index()];
		selected = choices[index];
	});
});

//Expands game board according to difficulty level
$(".difficulty > button").click(function(event) {
	var futureLevel = parseInt(event.target.innerHTML);
	var newColumns = futureLevel - difficultyLevel;
	if (newColumns >= 0) {
		for (i = 0; i < newColumns; i++) {
			$('<td class="space ' + mode + '"></td>').insertAfter(
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
	masterCodeGenerator(difficultyLevel, choices);
	$(".space")
		.off("click")
		.click(setUserChoice);
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

function setUserChoice() {
	var element = $(this);
	var position = element.index();
	var row = element.parent();

	if (parseInt(row.attr("row")) === attempts) {
		element.addClass("filled " + selected);
		userChoices[position] = selected;
		if (userChoices.length === difficultyLevel) {
			checkBtn.disabled = false;
		}
	}
}

$("#checkBtn").click(function() {
	if (!gameOver()) {
		// Update current row
		attempts++;
		// show Pegs
		drawPegs();
		// disable check button
		checkBtn.disabled = true;
		winGame(masterCode, userChoices);
		// reset user choices;
		userChoices = [];
	}
});

$("#clearBtn").click(function() {
	userChoices = [];
	var checkFilled = $(".filled");
	if ($("td").hasClass("filled")) {
		checkFilled.removeClass();
		checkFilled.addClass("space");
		checkBtn.disabled = true;
	}
});

function drawPegs() {
	var pegsArray = compareCodes(masterCode, userChoices);
	var currentPegsRow = attempts - 1;
	var pegTable = $('tr[row="' + currentPegsRow + '"] table');
	var firstRowLength = Math.ceil(difficultyLevel / 2);
	var pegClass;
	var peg;
	pegsArray.forEach(function(pegColor, index) {
		if (pegColor === null) {
			return;
		}

		switch (pegColor) {
			case "blackPeg":
				pegClass = "pegColorBlack";
				break;
			case "whitePeg":
				pegClass = "pegColorWhite";
				break;
		}

		if (index < firstRowLength) {
			peg = pegTable.find(
				".firstRowPeg .pegspace:nth-child(" + (index + 1) + ")"
			);
		} else {
			peg = pegTable.find(
				".secondRowPeg .pegspace:nth-child(" +
					(index - firstRowLength + 1) +
					")"
			);
		}

		peg.css("background-image", "none").addClass(pegClass);
	});
}

function gameOver() {
	if (attempts > 10) {
		if (confirm("GAME OVER! Want to play again?") == true) {
			window.location.reload();
		}
	}
}

// Testing win conditions: after comparing codes, receive an array of all black pegs
function winGame(masterCode, userChoices) {
	var allBlack = _.uniq(compareCodes(masterCode, userChoices));
	if (allBlack.length === 1 && allBlack[0] == "blackPeg") {
		$("#mastercode > td").each(function(index) {
			$(this).text("");
			$(this).addClass("filled " + masterCode[index]);
		});
		alert("Congratulations! You Won!");
	}
}

// MODE BUTTONS
// CLASSIC
$("#classic-btn").on("click", function() {
	window.location.reload();
});

// NUMBERS
$("#numbers-btn").on("click", function() {
	$("body")
		.removeClass("classic")
		.removeClass("cats")
		.addClass("numbers");
	choices = numbers;
	masterCodeGenerator(difficultyLevel, choices);
	userChoices = [];

	$("html, .difficulty>button, #clearBtn, #checkBtn").css(
		"font-family",
		"Orbitron"
	);
	$("html, .difficulty>button, #clearBtn, #checkBtn").css("font-size", "35px");
	$("html, .difficulty>button, #clearBtn, #checkBtn").css(
		"font-family",
		"Orbitron"
	);
	$("html, .difficulty>button, #clearBtn, #checkBtn").css("font-size", "35px");
});

// CATS!
$("#cats-btn").on("click", function() {
	$("body")
		.removeClass("classic")
		.removeClass("numbers")
		.addClass("cats");
	choices = cats;
	masterCodeGenerator(difficultyLevel, choices);
	userChoices = [];

	$("html, .difficulty>button, #clearBtn, #checkBtn").css(
		"font-family",
		"Poiret One"
	);
	$("html, .difficulty>button, #clearBtn, #checkBtn").css("font-size", "35px");
	$("html, .difficulty>button, #clearBtn, #checkBtn").css(
		"font-family",
		"Poiret One"
	);
	$("html, .difficulty>button, #clearBtn, #checkBtn").css("font-size", "35px");
});
