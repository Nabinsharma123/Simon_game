
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];

var userClickedPattern = [];
var start = 0;
var level = 0;
var HighScore = 0;


$(document).on("keypress", function () {
    if (start === 0) {
        nextSequence();
        setTimeout(function () { start = 1; }, 200);
    }

});

$(".click_here").on("click", function () {
    if (start === 0) {
        setTimeout(function () { nextSequence(); }, 200);

        setTimeout(function () { start = 1; }, 200);
    }
});

$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");
    var color = $("#" + userChosenColour).css("background-color");
    $(".footer").css("color", color);
    if (start === 1) {
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }

});



function nextSequence() {
    userClickedPattern = [];

    level++;
    if (level > HighScore) {
        HighScore = level;
        $("#highscore").html("High Score : " + HighScore);
    }
    $(".title").html("level " + level);
    var randomnumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            start = 0;
            setTimeout(function () { nextSequence(); }, 500);
            setTimeout(function () { start = 1; }, 500);

        }
    }
    else {
        startOver();
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        if (screen.width > 900)
            $(".title").html("Game Over, Press Any Key to Restart");
        else {
            $(".title").html("Game Over, Click <button class='click_here' > here</button> To restart");

            $(".click_here").on("click", function () {
                if (start === 0) {
                    setTimeout(function () { nextSequence(); }, 200);

                    setTimeout(function () { start = 1; }, 200);
                }
            });
        }
    }
}


function startOver() {
    start = 0;
    level = 0;
    gamePattern = [];

}








