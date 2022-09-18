import { SnakePart } from "./snakepart.js";

export class Snake{
    constructor(_headX, _headY, _tailLength, _speed){
        this.xDirection = 0;
        this.yDirection = 0;
        this.headX = _headX;
        this.headY = _headY;
        this.tailLength = _tailLength;
        this.speed = _speed;
        this.snakeParts = [];
    }

    updateSpeed(newSpeed){
        this.speed = newSpeed;
    }

    updateSnakePosition(){
        this.headX += this.xDirection;
        this.headY += this.yDirection;
    }

    moveUp(){
        // can't go in opposite direction bc snake will collide w/ itself
        if (this.yDirection == 1)
            return;
        this.xDirection = 0;
        this.yDirection = -1;
    }

    moveDown(){
        if (this.yDirection == -1)
            return;
        this.xDirection = 0;
        this.yDirection = 1;
    }

    moveLeft(){
        if (this.xDirection == 1)
            return;
        this.xDirection = -1;
        this.yDirection = 0;
    }

    moveRight(){
        if (this.xDirection == -1)
            return;
        this.xDirection = 1;
        this.yDirection = 0;
    }
}

