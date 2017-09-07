'use strict'

class BaseEnemy {
    constructor(position, pivotArr, hp, speed) {
        this.enemyType = 'BaseEnemy';
        this.position = Object.create(position);
        this.hp = hp || 100;
        this.speed = speed || 1;
        this.pivotArr = pivotArr;
        this.direction = calculateDir();
    }


    calculateDir() {

    }

    heat(bullet) {
        this.hp -= bullet.power;
        if (this.hp <= 0) {
            this.deleteEnemy();
        }
    }

    deleteEnemy() {}


    step

}



