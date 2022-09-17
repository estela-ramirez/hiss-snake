import { SnakePart } from './snakepart.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let tileCount = Math.sqrt(canvas.width); 
let tileSize = canvas.width / tileCount - 2;

const munchSound = new Audio("munch-sound.mp3");
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


export class Game{
    constructor(_snake, _apple){
        this.score = 0;
        this.gameIsOver = false;
        this.snake = _snake
        this.apple = _apple
    }

    drawApple(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.apple.x * tileCount, this.apple.y * tileCount, tileSize, tileSize);
    }

    drawSnake(){
        ctx.fillStyle = "blue";
        for (let i = 0; i < this.snake.snakeParts.length; i++){
            let part = this.snake.snakeParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        }
    
        // put item to end of list, next to head
        this.snake.snakeParts.push(new SnakePart(this.snake.headX, this.snake.headY)); 
         // while so you can penalize snake by crashing into wall or itself
        if (this.snake.snakeParts.length > this.snake.tailLength){
            this.snake.snakeParts.shift(); // remove farthest part
        }
    
        ctx.fillStyle = "blue";
        ctx.fillRect(this.snake.headX * tileCount, this.snake.headY * tileCount, tileSize, tileSize);
    }

    // when snake head and apple x,y are the same, redraw apple
    checkCollsion(){
        if (this.apple.x == this.snake.headX && this.apple.y == this.snake.headY){
            // redraw apple at random spot
            this.apple.x = Math.floor(Math.random() * tileCount);
            this.apple.y = Math.floor(Math.random() * tileCount);

            this.snake.tailLength++; 
            this.score++; 

            // safari throws an unhandled exception 
            if (isSafari == false){
                try {
                    munchSound.play();
                } catch (NotAllowedError) {
                    // do nothing 
                } 
            }
        }
    }
    
    // make background of game black 
    blackScreen(){
        ctx.fillStyle = "black";
        // default canvas size 400 x 400 
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    drawScore(){
        ctx.fillStyle = "white";
        ctx.font = "15px Verdana";
        ctx.fillText("Score: " + this.score, canvas.width - 70, 15);
    }
    
    displayGameOverMessage(message){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText(message, canvas.width / 6.5, canvas.height / 2);
    }

    checkGameStatus(){
        // game hasn't started, so the body is technically colliding with itself
        if (this.snake.xDirection == 0 && this.snake.yDirection == 0){
            return;
        }

        // goes out of bounds
        if (this.snake.headX < 0 || this.snake.headX == tileCount || this.snake.headY < 0 || this.snake.headY == tileCount){
            this.gameIsOver = true;
        }

        // once body has been drawn out & it collides w/ itself -> game over
        for (let i = 0; i < this.snake.snakeParts.length; i++){
            let part = this.snake.snakeParts[i];
            if (part.x == this.snake.headX && part.y == this.snake.headY){
                this.gameIsOver = true;
                break;
            }
        }
    }
}