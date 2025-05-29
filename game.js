var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []

var userClickedPattern = []

var userChoosenColor

var level = 0

var started = false

var highScore = 0

var clickAble = false

function nextSequence() {
    level++
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChoosenColor = buttonColors[randomNumber]
    console.log(randomChoosenColor)
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
        console.log("1 second passed")
    }, 200)

}

function sound(x) {
    var audio = new Audio("sounds/" + x + ".mp3")
    audio.play()
}


$(".btn").on("click", handleButtonClick)  


function checkAnswer() {

    var currentIndex = userClickedPattern.length - 1   

    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()   
            }, 1000)   
        }
    } else {
        end()   
    }
}

$(document).on("keydown", function () {
    if (!started) {
        $("h1").text("Level " + level)   
        nextSequence()   
        started = true   
    }
})

function end() {
    clickAble = false
    var audio = new Audio("sounds/wrong.mp3")
    audio.play()

    $("body").addClass("game-over")   

    setTimeout(function () {
        $("body").removeClass("game-over") 

        if (level > highScore) {
            highScore = level   
            $("h1").text("Game Over! You Got a High Score: " + level)   
            $("#highScore").text("High Score: " + highScore)   
        } else {
            $("h1").text("Game Over! Your Score: " + level)   
        }

        setTimeout(function () {
            $("h1").text("Press Any Key to Restart")   
            startOver()   
        }, 3000)   

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


