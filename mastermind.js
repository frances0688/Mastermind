// Variables
var insertPegFirstRow = true;
var checkBtn = document.getElementById("checkBtn");
var attempts = 0;
var colorPicked;

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
	element.addClass("filled " + colorPicked);
	userChoices[position] = colorPicked;
	if (userChoices.length == difficultyLevel) {
		document.getElementById("checkBtn").disabled = false;
		$("#checkBtn").click(function() {
			var pegsArray = compareCodes(masterCode, userChoices);
			pegsArray.forEach(function(pegColor) {
				if (pegColor === "blackPeg") {
					$(".pegspace")
						.css("background-image", "none")
						.addClass("pegColorBlack");
				} else if (pegColor === "whitePeg") {
					$(".pegspace")
						.css("background-image", "none")
						.addClass("pegColorWhite");
				} else {
					return;
				}
			});
		});
	}
});

//Game over function
$("#checkBtn").on("click", function() {
	attempts += 1;
	compareCodes(masterCode, userChoices);
	if (attempts >= 10) {
		if (confirm("GAME OVER! Want to play again?") == true) {
			window.location.reload();
			return;
		} else {
			return;
		}
	}
});
