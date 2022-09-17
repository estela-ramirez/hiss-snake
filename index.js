const canvas = document.getElementById("game");

// in order to draw on screen
const ctx = canvas.getContext("2d");

let speed = 7;
let tileCount = Math.sqrt(canvas.width); 
let tileSize = canvas.width / tileCount - 2;
let headX = 10; // canvas.width / 2 # FIX
let headY = 10; // canvas.width / 2 # FIX

let xDirection = 0;
let yDirection = 0;

let appleX = 5; // # FIX
let appleY = 5; // # FIX

// setTimeout -- allows us how often screen gets updated
// the longer the snake game, the faster the snake goes, 
// the faster we want refresh rate
function drawGame(){
    clearScreen();
    updateSnakePosition();
    checkCollsion();
    drawSnake();
    drawApple();
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

function updateSnakePosition(){
    headX += xDirection;
    headY += yDirection;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// when snake head and apple loc are the same, redraw apple
function checkCollsion(){
    if (appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    // up arrow
    // y increases down the canvas, decreases going up
    if (event.keyCode == 38){
        if (yDirection == 1)
            return;
        xDirection = 0;
        yDirection = -1;
        
    }

    // down arrow
    if (event.keyCode == 40){
        if (yDirection == -1)
            return;
        xDirection = 0;
        yDirection = 1;
    }

    // left arrow
    if (event.keyCode == 37){
        if (xDirection == 1)
            return;
        xDirection = -1;
        yDirection = 0;
    }

    // right arrow
    if (event.keyCode == 39){
        if (yDirection == -1)
            return;
        xDirection = 1;
        yDirection = 0;
    }
}


drawGame();