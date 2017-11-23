'use strict';

import eventBus from "../modules/eventBus";

export default class gameWorker {

    constructor() {
        this.bus = eventBus;

        this.myWorker = new Worker('worker.js');
        this.workerCallbacks();

        this.bus.on('workerMessage', (data) => {
            this.myWorker.postMessage(data);
        })
    }

    workerCallbacks() {
        this.myWorker.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            //какая то логика с data
            this.bus.emit(`workerCode${data.code}`, (data))
        }
    }
}






















































this.sizeOfField = 8;
this.arrayOfPlane = this.makeDoubleArray(this.sizeOfField);




makeDoubleArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array[i] = [];
    }
    return array;
}







