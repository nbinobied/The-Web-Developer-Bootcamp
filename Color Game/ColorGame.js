var colors = generateRandomColors(6);
var pickedColor = pickColor();

var numSquares = 6;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
colorDisplay.textContent = pickedColor;

init();

function init() {
    setModeButton();

    SetSquares();
}

function setSquare() {
    for (var i = 0; i < squares.length; i++) {
        //Add initial colors to squares
        squares[i].style.backgroundColor = colors[i];

        //ad click listeners to squares
        squares[i].addEventListener("click", function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;

            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changedColor(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function setModeButton() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numSquares);

    //pick a new random color from array
    pickedColor = pickColor();

    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";

    //change colors of square 
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
    reset();
});

function changedColor(color) {
    //loop through all squares
    for (var i = 0; i < colors.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];

    //add num to random colors to array
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
        //get random color and push into arr
    }

    //retrun the array
    return arr;
}

function randomColor() {
    //pick a red from 0 to 255
    var r = Math.floor(Math.random() * 256);

    //pick a green from 0 to 255
    var g = Math.floor(Math.random() * 256);

    //pick a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}