import { SnakePart } from './snakepart.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let tileCount = Math.sqrt(canvas.width); 
let tileSize = canvas.width / tileCount - 2;

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
        
// Add colors
grd.addColorStop(0.000, 'rgb(252, 245, 95)');
grd.addColorStop(0.133, 'rgba(247, 149, 51, 1.000)');
grd.addColorStop(0.220, 'rgba(243, 112, 85, 1.000)');
grd.addColorStop(0.311, 'rgba(239, 78, 123, 1.000)');
grd.addColorStop(0.462, 'rgba(161, 102, 171, 1.000)');
grd.addColorStop(0.621, 'rgba(80, 115, 184, 1.000)');
grd.addColorStop(0.748, 'rgba(16, 152, 173, 1.000)');
grd.addColorStop(0.875, 'rgba(7, 179, 155, 1.000)');
grd.addColorStop(1.000, 'rgba(111, 186, 130, 1.000)');

export class Game{
    constructor(_snake, _apple, _badApple){
        this.score = 0;
        this.gameIsOver = false;
        this.gameStarted = false;
        this.snake = _snake;
        this.apple = _apple;
        this.badApple = _badApple;
    }

    showInstructions(){
        console.log("instructions");
        ctx.fillStyle = "white";
        ctx.font = "15px Verdana";
        ctx.fillText("Game Rules", canvas.width / 12, canvas.height / 4.2);
        ctx.fillText("Goal is to eat the gradient colored apple.", canvas.width / 12, canvas.height / 3);
        ctx.fillText("Eating red apple decreases score by 5 points.", canvas.width / 12, canvas.height / 2.5);
        ctx.fillText("Eating red apple leads to flashing for 3 sec.", canvas.width / 12, canvas.height / 2.2);
        ctx.fillText("Snake head is blue.", canvas.width / 12, canvas.height / 1.8);
        ctx.fillText("Press any arrow key to begin.", canvas.width / 12, canvas.height / 1.5);
    }

    drawApples(){
        ctx.fillStyle = grd;
        ctx.fillRect(this.apple.x * tileCount, this.apple.y * tileCount, tileSize, tileSize);
                
        ctx.fillStyle = "#D70040";
        ctx.fillRect(this.badApple.x * tileCount, this.badApple.y * tileCount, tileSize, tileSize);
        
    }

    drawSnake(){
        // Create gradient
        ctx.fillStyle = grd;

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
    
        ctx.fillRect(this.snake.headX * tileCount, this.snake.headY * tileCount, tileSize, tileSize);
    }

    monitorScore(){
        if (this.score > 3){
            this.snake.updateSpeed(7);
        }
        if (this.score > 5){
            this.snake.updateSpeed(11);
        }
        if (this.score > 9){
            this.snake.updateSpeed(15);
        }
    }

    // when snake head and apple x,y are the same, redraw apple
    checkCollsions(){
        this.checkCollsionWithApple(this.badApple);
        this.checkCollsionWithApple(this.apple);
        
    }
    
    // generate new x,y coordinates for eaten apple
    // generates unique coordinates from other apple
    generateNewXAndY(apple, otherApple){
        let newX = Math.floor(Math.random() * tileCount);
        let newY = Math.floor(Math.random() * tileCount);

        while (newX == otherApple.x && newY == otherApple.y){
            newX = Math.floor(Math.random() * tileCount);
            newY = Math.floor(Math.random() * tileCount);
        }
        apple.x = newX;
        apple.y = newY;
    }

    checkCollsionWithApple(apple){
        if (apple.x == this.snake.headX && apple.y == this.snake.headY){

            if (apple.isGood()){
                this.generateNewXAndY(this.apple, this.badApple);
                this.snake.tailLength++; 
                this.score++; 
            }else{
                this.generateNewXAndY(this.badApple, this.apple);
                this.snake.updateIsHurt(true);
                // penalize score for eating bad apple
                this.score = this.score - 5;
                if (this.score < 0) {
                    this.score = 0;
                }
            }

            // safari throws an unhandled exception 
            if (isSafari == false){
                try {
                    apple.playSound();
                } catch (NotAllowedError) {
                    // do nothing 
                } 
            }
            
        }
    }
    // make background of game black 
    blackScreen(){
        ctx.fillStyle = "#1C1D24";
        // default canvas size 400 x 400 
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    drawScore(){
        ctx.fillStyle = "white";
        ctx.font = "15px Verdana";
        ctx.fillText("Score: " + this.score, canvas.width - 90, 20);
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

        this.gameStarted = true;

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