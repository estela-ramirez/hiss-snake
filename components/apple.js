export class Apple{
    constructor(_x, _y, goodOrNot, _sound){
        this.x = _x;
        this.y = _y;
        this.good = goodOrNot;
        this.sound = _sound;
    }

    isGood(){
        return this.good;
    }

    playSound(){
        this.sound.play();
    }
}