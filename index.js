const canvas = document.getElementById("game");

// in order to draw on screen
const ctx = canvas.getContext("2d");

let speed = 7;
let tileCount = Math.sqrt(canvas.width); 
let tileSize = canvas.width / tileCount - 2;
let headX = 1; // canvas.width / 2 # FIX
let headY = 1; // canvas.width / 2 # FIX

let xVelocity = 0;
let yVelocity = 0;

// setTimeout -- allows us how often screen gets updated
// the longer the snake game, the faster the snake goes, 
// the faster we want refresh rate
function drawGame(){
    clearScreen();
    drawSnake();
    console.log(Math.sqrt(canvas.width));
    setTimeout(drawGame, 1000/speed);
}

// clear screen to black 
function clearScreen(){
    ctx.fillStyle = "black";
    // default canvas size 400 x 400 
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();