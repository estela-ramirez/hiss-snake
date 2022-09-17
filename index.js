import {Snake} from './snake.js';
import {Apple} from './apple.js';
import {Game} from '/game.js';


let snake = new Snake(10,10,2,7);
let apple = new Apple(5,5);
let game = new Game(snake, apple);

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

    game.checkGameStatus();
    
    if (game.gameIsOver){
        game.displayGameOverMessage("Game Over!");
        return;
    }

    game.blackScreen();
    game.checkCollsion();
    game.drawApple();
    game.drawSnake();
    game.drawScore();

    
    if (game.score > 2){
        snake.speed = 11;
    }
    if (game.score > 5){
        snake.speed = 15;
    }

    setTimeout(drawGame, 1000/snake.speed);
}

drawGame();