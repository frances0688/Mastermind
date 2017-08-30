//Expands game board according to difficulty level
var insertPegFirstRow = true;

$(".difficulty > button").click(function(event) {
	var futureLevel = parseInt(event.target.innerHTML);
	var newColumns = futureLevel - difficultyLevel;
	if (newColumns >= 0) {
		for (i = 0; i < newColumns; i++) {
			$(
				"<td><img class = 'space' src='img/black circle.png'></td>"
			).insertAfter(
				"#main-game > tbody > tr > td:nth-child(" + difficultyLevel + ")"
			);
			if (insertPegFirstRow) {
				$(".firstRowPeg").append(
					'<img class = "pegspace" src="img/black circle.png">'
				);
				insertPegFirstRow = false;
			} else {
				$(".secondRowPeg").append(
					'<img class = "pegspace" src="img/black circle.png">'
				);
				insertPegFirstRow = true;
			}
		}
	} else {
		for (i = newColumns; i < 0; i++) {
			$("#main-game > tbody > tr > td").remove(":nth-child(1)");
			if (insertPegFirstRow) {
				$(".secondRowPeg>img").remove(":nth-child(1)");
				insertPegFirstRow = false;
			} else {
				$(".firstRowPeg>img").remove(":nth-child(1)");
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
