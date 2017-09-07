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
        this.target_pos = undefined;//надо заменить на ссылку на объект
        this.enemyArray = enemyArray;
        this.bulletArray = [];//здесь должна храниться ссылка на массив пуль. каждая башня должна ссылаться на один и тот же массив
       // var self = this; //не будет ли везде один и тот же self?
    }




    calculateDistance(target_pos) {
        target_pos = target_pos || this.target_pos;
        return Math.sqrt(Math.pow(this.position.x_pos - target_pos.x_pos, 2) + Math.pow(this.position.y_pos - target_pos.y_pos, 2))
    }


    checkTarget() {
        return this.target_pos && this.calculateDistance() <= this.radius;
    }


    findTarget() {
        if (this.checkTarget())
            return this.target_pos;
        //поиск цели. нужно оптимизировать поиск по массиву целей. например бинарный
        for (let i = 0; i < this.enemyArray.length; i--)
            if (this.calculateDistance(this.enemyArray[i].position) <= this.radius)
                return this.target_pos = this.enemyArray[i].position;//скопирует ссылку на данные или значения?
        return undefined;
    }


    calculateAngle() {
        let alpha = Math.acos(Math.abs((this.position.x_pos - this.target_pos.x_pos) / (this.position.x_pos - this.target_pos.x_pos)));
        if (this.position.x_pos > this.target_pos.x_pos)
            if (this.position.y_pos > this.target_pos.y_pos)
                return -(90 + alpha);
            else
                return 90 + alpha;
        else
            if (this.position.y_pos > this.target_pos.y_pos)
                return -90 + alpha;
            else
                return 90 - alpha;
    }


    rotate() {
        this.direction = this.calculateAngle();
    }


    fire() {
        this.target_pos = this.findTarget();
        if (this.target_pos) {
            this.rotate();
            return this.bulletArray.push(new Bullet(this));//передастся tower или bullet? нужно передать tower
        }
    }
}

class Tower extends BaseTower {
    constructor() {
        super(enemyArray);
        this.towerType = "Tower";
    }
}


