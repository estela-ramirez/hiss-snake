import {Snake} from './components/snake.js';
import {Apple} from './components/apple.js';
import {Game} from './components/game.js';

const munchSound = new Audio("audio/munch-sound.mp3");
const hurtSound = new Audio("audio/hurt.wav");

let snake = new Snake(10,10,2,5);
let apple = new Apple(5,5, true, munchSound);
let badApple = new Apple(15,15, false, hurtSound);

let game = new Game(snake, apple, badApple);

// event listener to listen to when arrow keys are pressed
document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    // up arrow
    if (event.keyCode == 38){
        snake.moveUp();
    }

    // down arrow
    if (event.keyCode == 40){
        snake.moveDown();
    }

    // left arrow
    if (event.keyCode == 37){
        snake.moveLeft();
    }

    // right arrow
    if (event.keyCode == 39){
        snake.moveRight();
    }
}

function drawGame(){
    snake.updateSnakePosition();

    // want to do this before drawing snake to keep snake head in bounds
    game.checkGameStatus();
    if (game.gameIsOver){
        game.displayGameOverMessage("Game Over!");
        return;
    }

    game.blackScreen();
    
    if (game.gameStarted == false){
        game.showInstructions();
        game.drawApples();
        game.drawSnake();
        game.drawScore();
    }else{
        game.checkCollsions();
        game.drawApples();
        game.drawSnake();
        game.drawScore();
        game.monitorScore();
    }

    setTimeout(drawGame, 1000/snake.speed);
}

drawGame();