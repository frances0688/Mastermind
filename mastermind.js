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

//Game over function
$("#checkBtn").on("click", function() {
	attempts += 1;
	if (attempts >= 10) {
		if (confirm("GAME OVER! Want to play again?") == true) {
			window.location.reload();
			return;
		} else {
			return;
		}
	}
});

// var choice = $(".choices").each(function() {
// 	$(this).click(function(e) {
// 		userChoices.push(colors[$(this).index()]);
// 		console.log(userChoices);
// 	});
// });

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
	console.log(userChoices);
});
