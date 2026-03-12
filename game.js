var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false
var highScore = 0
var clickAble = false

var keyToColor = {
    r: "red",
    b: "blue",
    g: "green",
    y: "yellow"
}

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

$("#how-to-play-btn").on("click", function () {
    var panel = $("#how-to-play-panel")
    var isOpen = panel.hasClass("is-open")

    panel.toggleClass("is-open", !isOpen)
    panel.attr("aria-hidden", isOpen ? "true" : "false")
    $(this).attr("aria-expanded", isOpen ? "false" : "true")
})

$(document).on("keydown", function (event) {
    var keyPressed = (event.key || "").toLowerCase()
    var mappedColor = keyToColor[keyPressed]

    if (!mappedColor) return

    handleColorInput(mappedColor)
})

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

function handleColorInput(userChoosenColor) {
    if (!clickAble) return

    sound(userChoosenColor)
    animation(userChoosenColor)
    userClickedPattern.push(userChoosenColor)
    checkAnswer()
}

function handleButtonClick() {
    var userChoosenColor = $(this).attr("id")
    handleColorInput(userChoosenColor)
}
