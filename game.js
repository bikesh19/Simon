var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false
var highScore = 0
var clickAble = false

function nextSequence() {
    level++
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChoosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChoosenColor)
    animation(randomChoosenColor)
    sound(randomChoosenColor)
    userClickedPattern = []
    clickAble = true
}

function animation(x) {
    $("." + x).addClass("pressed")
    setTimeout(function () {
        $("." + x).removeClass("pressed")
    }, 200)
}

function sound(x) {
    var audio = new Audio("sounds/" + x + ".mp3")
    audio.play()
}

function startGame() {
    if (started) return

    started = true
    level = 0
    gamePattern = []
    $("#start-btn").text("Game Running")
    nextSequence()
}

$(".btn").on("click", handleButtonClick)
$("#start-btn").on("click", startGame)


function checkAnswer() {
    var currentIndex = userClickedPattern.length - 1

    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            clickAble = false
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        end()
    }
}

function end() {
    clickAble = false
    sound("wrong")

    $("body").addClass("game-over")

    setTimeout(function () {
        $("body").removeClass("game-over")

        if (level > highScore) {
            highScore = level
            $("#level-title").text("Game Over! New High Score: " + level)
            $("#highScore").text("High Score: " + highScore)
        } else {
            $("#level-title").text("Game Over! Your Score: " + level)
        }

        setTimeout(function () {
            $("#level-title").text("Tap Start to Play")
            $("#start-btn").text("Start Game")
            startOver()
        }, 1800)

    }, 200)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}

function handleButtonClick() {
    if (!clickAble) return

    var userChoosenColor = $(this).attr("id")
    sound(userChoosenColor)
    animation(userChoosenColor)
    userClickedPattern.push(userChoosenColor)
    checkAnswer()
}
