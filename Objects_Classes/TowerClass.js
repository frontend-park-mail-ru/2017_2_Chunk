'use strict';

class BaseTower {
    constructor(enemyArray, position) {
        this.towerType = 'Base';
        this.position = Object.create(position);
        /*{
            position.x_pos : 0,
            y_pos : 0
        };*/
        this.direction = 0;
        this.radius = 50;
        this.power = 2;
        this.target = undefined;
        // this.target_pos = undefined;//надо заменить на ссылку на объект
        this.enemyArray = enemyArray;
        this.bulletArray = [];//здесь должна храниться ссылка на массив пуль. каждая башня должна ссылаться на один и тот же массив
       // var self = this; //не будет ли везде один и тот же self?
    }


    calculateDistance(target_pos) {
        target_pos = target_pos || this.target.position;
        return Math.sqrt(Math.pow(this.position.x_pos - target_pos.x_pos, 2) + Math.pow(this.position.y_pos - target_pos.y_pos, 2))
    }


    checkTarget() {
        return (this.target) && (this.target.alive === true) && (this.calculateDistance() <= this.radius);
    }


    findTarget() {
        console.log(this.checkTarget());
        if (this.checkTarget()) {
            console.log("target is " + this.target.position.x_pos);
            return this.target;
        }
        this.target = undefined;//лишняя подстраховка?
        //поиск цели. нужно оптимизировать поиск по массиву целей. например бинарный
        console.log("new target");
        for (let i = 0; i < this.enemyArray.length; i++)
            if (this.calculateDistance(this.enemyArray[i].position) <= this.radius) {
                this.target = this.enemyArray[i];//скопирует ссылку на данные или значения?
                return;
            }
        this.target = undefined;
    }


    calculateAngle() {
        //вывод координат башни и цели
        console.log('this.position.x_pos: ');
        console.log(this.position.x_pos);
        console.log('this.target.position.x_pos: ');
        console.log(this.target.position.x_pos);
        console.log('this.position.y_pos: ');
        console.log(this.position.y_pos);
        console.log('this.target.position.y_pos: ');
        console.log(this.target.position.y_pos);

        let x_length = Math.abs(this.position.x_pos - this.target.position.x_pos);
        let y_length = Math.abs(this.position.y_pos - this.target.position.y_pos);
        let hip = Math.sqrt(x_length * x_length + y_length * y_length);
        console.log('hip = ', hip);
        let alpha = Math.acos(y_length / hip);//radian
        alpha = Math.round(alpha * 180 / Math.PI);
        console.log('alpha = ', alpha);
        if (this.position.x_pos > this.target.position.x_pos)
            if (this.position.y_pos > this.target.position.y_pos)
                return -(90 + alpha);
            else
                return 90 + alpha;
        else
            if (this.position.y_pos > this.target.position.y_pos)
                return -90 + alpha;
            else
                return 90 - alpha;
    }


    rotate() {
        this.direction = this.calculateAngle();
        console.log(this.direction);
    }


    fire() {
        this.findTarget();
        if (this.target) {
            this.rotate();
            console.log('Fire');
            return this.bulletArray.push(1);//передастся tower или bullet? нужно передать tower
        }
        console.log('not fire');
    }
}



class Tower extends BaseTower {
    constructor(enemyArray, position) {
        super(enemyArray, position);
        this.towerType = "Tower";
    }
}


class Enemy {
    constructor(position) {
        this.position = Object.create(position);
        this.hp = 100;
        this.alive = true;
    }
}


let enemyArray = [];
let enemyPosition = {
    x_pos: 49,
    y_pos: 0
};

let towerPosition = {
    x_pos: 0,
    y_pos: 0
};


enemyArray.push(new Enemy(enemyPosition));
let tower = new Tower(enemyArray, towerPosition);
for (let i = 0; i < 5; i++) {
    tower.fire();
}

let enemyPosition2 = {
    x_pos: 15,
    y_pos: 15
};



enemyArray.pop().alive = false;
console.log(tower.enemyArray);
enemyArray.push(new Enemy(enemyPosition2));
console.log(enemyArray);
console.log(enemyArray[0].position.x_pos);
console.log(tower.target.position.x_pos);
tower.fire();
console.log(tower.target.position.x_pos);
console.log(tower.bulletArray);